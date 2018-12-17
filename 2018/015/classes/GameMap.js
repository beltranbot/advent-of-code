const { Node } = require('./Node')
const { Unit } = require('./Unit')

class GameMap {
  constructor(input) {
    this.units = []
    this.gameMap = null
    this.previousTurnMap = null
    this.NEIGHBORS = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ]
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

  sortUnits() {
    this.units.sort((a, b) => {
      if (a.row < b.row) {
        return 1
      } else if (b.row > a.row) {
        return -1
      } else if (a.col > b.col) {
        return 1
      } else if (b.col > a.col) {
        return -1
      }

      return 0
    })
  }

  distances(unit, enemies) {
    let distances = []
    for (const enemy of enemies) {
      distances.push(this.pathFinder(unit, enemy))
      // break
    }

    return distances
  }

  step() {

    for(let unit of this.units) {
      let enemy = unit.type === 'E' ? 'G' : 'E'
      let enemies = this.units.filter(unit => unit.type === enemy)

      let distances = this.distances(unit, enemies)
      console.log(distances)
      break
    }


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
        if (neighbor.isWall(enemy)) continue
  
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
    
      return !route ? false : route.g
    }
  }

  module.exports = { GameMap }