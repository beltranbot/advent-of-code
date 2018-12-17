const { Node } = require('./Node')
const { Unit } = require('./Unit')

class GameMap {
  constructor(input) {
    this.units = []
    this.gameMap = null
    this.previousTurnMap = null
    this.elves = 0
    this.goblins = 0
    this.NEIGHBORS = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]
    this.turns = 1
    this.buildGameMap(input)
  }

  buildGameMap(input) {
    input = input.split('\n')
    let matrix = []
    let id = 0

    for (let row = 0; row < input.length; row++) {
      let row_matrix = []

      for (let col = 0; col < input[row].length; col++) {
        let type = input[row][col]
        let node_unit = null

        switch (type) {
          case 'E':
          case 'G':
            let unit = new Unit({
              id,
              row,
              col,
              type,
              hp: 200,
              atk: 3
            })
            id++
            this.addUnit(unit)
            node_unit = unit
            if (type === 'G') {
              this.goblins++
            } else if (type === 'E') {
              this.elves++
            }
          default:
            break
        }
        row_matrix.push(new Node({
          row,
          col,
          value: type,
          unit: node_unit
        }))
      }

      matrix.push(row_matrix)
    }

    this.setMap(matrix)
  }

  setMap(gameMap) {
    this.gameMap = gameMap
  }

  addUnit(unit) {
    this.units.push(unit)
  }

  sortUnits(a, b) {
    if (a.row < b.row) {
      return -1
    } else if (b.row < a.row) {
      return 1
    } else if (a.col < b.col) {
      return -1
    } else if (b.col < a.col) {
      return 1
    }

    return 0
  }

  distances(unit, enemies) {
    let distances = []
    for (const enemy of enemies) {
      let enemy_neighbors = []
      for (let neighbor of this.NEIGHBORS) {
        let n = {}
        n.row = enemy.row + neighbor[0]
        n.col = enemy.col + neighbor[1]
        n.value = this.gameMap[n.row][n.col].value
        if (n.value !== '.') continue
        enemy_neighbors.push(n)
      }

      for (let enemy_neighbor of enemy_neighbors) {
        distances.push(this.pathFinder(unit, enemy_neighbor))
      }
    }

    return distances.filter(x => x !== false)
  }

  sortDistances(a, b) {
    if (a.g < b.g) {
      return -1
    } else if (b.g < a.g) {
      return 1
    } else if (a.row < b.row) {
      return -1
    } else if (b.row < a.row) {
      return 1
    } else if (a.col < b.col) {
      return -1
    } else if (b.col < a.col) {
      return 1
    }
    return 0
  }

  printGameMap() {
    let output = ''

    for (let row = 0; row < this.gameMap.length; row++) {
      let tail = ''
      for (let col = 0; col < this.gameMap[row].length; col++) {
        output += this.gameMap[row][col].value
        if (['G', 'E'].includes(this.gameMap[row][col].value)) {
          tail += ` ${this.gameMap[row][col].value}(${this.gameMap[row][col].unit.hp})`
        }
      }
      output += tail + '\n'
    }

    console.log(output)
  }

  checkNeighborsForEnemies(unit, enemy) {
    let enemies = []
    for (const neighbor of this.NEIGHBORS) {
      let row = unit.row + neighbor[0]
      let col = unit.col + neighbor[1]
      if (this.gameMap[row][col].value === enemy) {
        enemies.push(this.gameMap[row][col].unit)
      }
    }

    if (enemies.length > 0) {
      if (enemies.length > 1) {
        enemies.sort(this.sortEnemiesByHP)
      }

      let choosenEnemy = enemies.shift()
      choosenEnemy.hp -= unit.atk

      if (choosenEnemy.hp <= 0) {
        this.gameMap[choosenEnemy.row][choosenEnemy.col].unit = null
        this.gameMap[choosenEnemy.row][choosenEnemy.col].value = '.'
      }
      return true
    }

    return false
  }

  sortEnemiesByHP(a, b) {
    if (a.hp < b.hp) {
      return -1
    } else if (b.hp < a.hp) {
      return 1
    } else if (a.row < b.row) {
      return -1
    } else if (b.row < a.row) {
      return 1
    } else if (a.col < b.col) {
      return -1
    } else if (b.col < a.col) {
      return 1
    }
    return 0
  }

  removeFallenUnits() {
    for (let i = this.units.length - 1; i >= 0; i--) {
      if (this.units[i].hp <= 0) {
        if (this.units[i].type === 'G') this.goblins--
        if (this.units[i].type === 'E') this.elves--
        this.units.splice(i, 1)
      }
    }
  }

  moveUnit(unit, enemies) {

    let distances = this.distances(unit, enemies)
    if (distances.length === 0) return false
    if (distances.length > 1) {
      distances.sort(this.sortDistances)
    }

    let move = distances.shift()
    while (move.previous.previous !== null) {
      move = move.previous
    }

    this.gameMap[unit.row][unit.col].value = '.'
    this.gameMap[unit.row][unit.col].unit = null
    unit.row = move.row
    unit.col = move.col
    this.gameMap[unit.row][unit.col].value = unit.type
    this.gameMap[unit.row][unit.col].unit = unit
    move.previous = null

    return true
  }

  mapScore() {
    let score = 0
    for (const unit of this.units) {
      // console.log(unit, unit.hp)
      if (unit.hp <= 0) continue
      score += unit.hp
    }
    console.log(this.turns, score)
    return this.turns * score
  }

  step() {
    
    // console.log('turn', this.turns)
    this.printGameMap()
    if (this.goblins <= 0 || this.elves <= 0) {
      this.turns--
      return this.mapScore()
    }
    this.units.sort(this.sortUnits)
    for (let unit of this.units) {
      if (unit.hp <= 0) continue

      let enemy = unit.type === 'E' ? 'G' : 'E'

      // check neighbors and attack      
      if (this.checkNeighborsForEnemies(unit, enemy)) continue
      let enemies = this.units.filter(unit => unit.type === enemy && unit.hp > 0)

      if (enemies.length === 0) {
        this.turns--
        return this.mapScore()
      }

      // choose enemy to move to
      if (this.moveUnit(unit, enemies)) {
        // check neighbors and attack after moving
        this.checkNeighborsForEnemies(unit, enemy)
      }
    }
    // console.log(this.units)
    this.printGameMap()
    this.removeFallenUnits()
    if (this.goblins <= 0 || this.elves <= 0) {
      // console.log('or here')
      return this.mapScore()
    }
    
    this.turns++
    return false
  }

  neighborExists([row, col]) {
    return this.gameMap[row] && this.gameMap[row][col]
  }

  pathFinder(unit, enemy) {

    function heuristicManhattan(a, b) {
      return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
    }

    let start = this.gameMap[unit.row][unit.col]
    let end = this.gameMap[enemy.row][enemy.col]

    let open_set = new Set()
    let closed_set = new Set()
    let route = null
    open_set.add(start)

    while (open_set.size) {

      let current = [...open_set].reduce((a, c) => c.f < a.f ? c : a, { f: Infinity })

      if (current == end) {
        route = current
        break
      }

      // remove current from openset
      open_set.delete(current)
      closed_set.add(current)

      for (const [n_row, n_col] of this.NEIGHBORS) {
        let next_row = n_row + current.row
        let next_col = n_col + current.col

        if (!this.neighborExists([next_row, next_col])) continue
        let neighbor = this.gameMap[next_row][next_col]

        if (closed_set.has(neighbor)) continue
        if (neighbor.isWall()) continue

        let temp_g = current.g + 1
        let new_path = false // only add path if is a better route

        if (open_set.has(neighbor)) {
          if (temp_g < neighbor.g) {
            neighbor.g = temp_g
            new_path = true
          }
        } else {
          neighbor.g = temp_g
          new_path = true
          open_set.add(neighbor)
        }

        if (new_path) {
          neighbor.h = heuristicManhattan(neighbor, end)
          neighbor.f = neighbor.g + neighbor.h
          neighbor.previous = current
        }
      } // end for
    } // end while

    // return !route ? false : route.g
    return !route ? false : route
  }
}

module.exports = { GameMap }