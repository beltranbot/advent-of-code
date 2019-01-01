let fs = require('fs')
const path = require('path')
const { Nodo } = require('./Nodo')

class World {

  constructor(input) {

    this.length = input.length
    this.width = input[0].length
    this.start = null

    this.matrix = this.generateNodoMatrix(input)

    this.nodes = []
  }

  writeOutput(output) {
    fs.writeFile(path.join(__dirname, '../js_output.txt'), output, function (err) {
      if (err) return console.log(err)
      console.log("finished")
    })
  }

  generateNodoMatrix(input) {

    let matrix = []

    for (let row = 0; row < input.length; row++) {
      let matrix_row = []
      for (let col = 0; col < input[row].length; col++) {
        let el = input[row][col]

        let nodo = new Nodo({
          row,
          col,
          value: el,
          world: this
        })

        if (el === '+') {
          this.start = nodo
        }

        matrix_row.push(nodo)
      }

      matrix.push(matrix_row)
    }

    return matrix
  }

  printOutput(toConsole = true) {
    let matrix = this.matrix
    let output = ''

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        output += matrix[row][col].value !== '|' ? matrix[row][col].value :
          matrix[row][col].parent ? matrix[row][col].value : 'x'
      }
      output += '\n'
    }

    if (toConsole) {
      console.log(output)
    } else {
      this.writeOutput(output)
    }

  }

  addToNodes(new_node, type = 'push') {
    for (const node of this.nodes) {
      if (new_node.row === node.row && new_node.col === node.col) {
        return
      }
    }
    if (type === 'push') {
      this.nodes.push(new_node)
    } else if (type === 'unshift') {
      this.nodes.unshift(new_node)
    }

  }

  nodesInclude(goal_node) {
    for (const node of this.nodes) {
      if (goal_node.row === node.row && goal_node.col === node.col) {
        return true
      }
    }
    return false
  }

  run() {
    this.nodes = [this.start]

    while (this.nodes.length > 0) {
      let node = this.nodes.shift()

      if (node.value === '+') {
        let node_down = node.down()
        node_down.addParent(node)
        this.addToNodes(node_down)
      } else if (node.value === '.') {
        node.value = '|'

        if (this.matrix[node.row + 1] === undefined) {
          if (this.nodes.length > 0) {
            continue
          }
          break
        }

        let node_down = node.down()
        if (node_down === undefined) {
          if (this.nodes.length > 0) {
            continue
          }
          break
        }
        if (node_down.value === '.') {
          node_down.addParent(node)
          this.addToNodes(node_down)
        } else if (['#', '~'].includes(node_down.value)) {
          node.spread()
        }
      } else if (node.value === '|') {
        if (['#', '~'].includes(node.down().value)) {
          node.spread()
        }
      }

      // this.printOutput()

    }

    this.printOutput(false)

  }

  removeFromNodes(node, removeFromParent = true) {
    this.nodes = this.nodes.filter(n => {
      return !(n.row === node.row && n.col === node.col)
    })
    if (removeFromParent) {
      let parent = node.parent
      parent.children = parent.children.filter(n => {
        return !(n.row !== node.row && n.col !== node.col)
      })
      node.parent = null
    }
  }

  countReachedTiles(min_row, max_row, search = ['|', '~']) {
    let tiles = 0

    for (let row = min_row; row <= max_row; row++) {
      tiles += this.matrix[row].filter(x => search.includes(x.value)).length
    }

    return tiles
  }
}

module.exports = { World }