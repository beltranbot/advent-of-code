let fs = require('fs')
const path = require('path')

function writeOutput(output) {
  fs.writeFile(path.join(__dirname, './js_output.txt'), output, function (err) {
    if (err) return console.log(err)
    console.log("finished")
  })
}

const NEIGHBORS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
]

const TREES = '|'
const OPEN = '.'
const LUMBERJACK = '#'

function getOutput(i, matrix) {
  let output = i + '\n'

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      output += matrix[row][col]

    }
    output += '\n'
  }
  let wooded = matrix.reduce((a, c) => a + c.filter(x => x === TREES).length, 0)
  let lumberjacks = matrix.reduce((a, c) => a + c.filter(x => x === LUMBERJACK).length, 0)
  output += `wooded: ${wooded}, lumberjacks: ${lumberjacks}, total: ${wooded * lumberjacks}`
  return output
}

function printMatrix(matrix) {
  let output = ''

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      output += matrix[row][col]
    }
    output += '\n'
  }

  console.log(output)
}

function buildMatrix(input) {
  input = input.split('\n')

  let matrix = []

  for (let row = 0; row < input.length; row++) {
    let matrix_row = []
    for (let col = 0; col < input[row].length; col++) {
      matrix_row.push(input[row][col])
    }
    matrix.push(matrix_row)
  }

  return matrix
}

function checkNeighbors(matrix, { row, col }) {
  let neighbors = {}
  neighbors[TREES] = 0
  neighbors[OPEN] = 0
  neighbors[LUMBERJACK] = 0

  for (const neighbor of NEIGHBORS) {
    let n_row = row + neighbor[0]
    let n_col = col + neighbor[1]

    if (matrix[n_row] && matrix[n_row][n_col]) {
      neighbors[matrix[n_row][n_col]]++
    }
  }

  return neighbors
}

function solve1(input, n = 10) {
  let matrix = buildMatrix(input)

  let i = 0

  while (i++ < n) {

    let new_matrix = []


    for (let row = 0; row < matrix.length; row++) {
      let new_matrix_row = []
      for (let col = 0; col < matrix[row].length; col++) {

        let neighbors = checkNeighbors(matrix, { row, col })
        let tile = matrix[row][col]

        switch (tile) {
          case OPEN:
            if (neighbors[TREES] >= 3) {
              new_matrix_row.push(TREES)
            } else {
              new_matrix_row.push(OPEN)
            }
            break
          case TREES:
            if (neighbors[LUMBERJACK] >= 3) {
              new_matrix_row.push(LUMBERJACK)
            } else {
              new_matrix_row.push(TREES)
            }
            break
          case LUMBERJACK:
            if (neighbors[LUMBERJACK] >= 1 && neighbors[TREES] >= 1) {
              new_matrix_row.push(LUMBERJACK)
            } else {
              new_matrix_row.push(OPEN)
            }
            break
          default:
            console.log('error default')
        }
      }
      new_matrix.push(new_matrix_row)
    }

    matrix = new_matrix

    printMatrix(matrix)

  } // end while

  let wooded = matrix.reduce((a, c) => a + c.filter(x => x === TREES).length, 0)
  let lumberjacks = matrix.reduce((a, c) => a + c.filter(x => x === LUMBERJACK).length, 0)

  return wooded * lumberjacks
}

function solve2(input, n = 1000) {
  let matrix = buildMatrix(input)

  let i = 0

  let output = ''

  let totals = [0]
  let match_total = 0
  let acres = []

  while (i++ < n) {
    // console.log(i)
    let new_matrix = []


    for (let row = 0; row < matrix.length; row++) {
      let new_matrix_row = []
      for (let col = 0; col < matrix[row].length; col++) {

        let neighbors = checkNeighbors(matrix, { row, col })
        let tile = matrix[row][col]

        switch (tile) {
          case OPEN:
            if (neighbors[TREES] >= 3) {
              new_matrix_row.push(TREES)
            } else {
              new_matrix_row.push(OPEN)
            }
            break
          case TREES:
            if (neighbors[LUMBERJACK] >= 3) {
              new_matrix_row.push(LUMBERJACK)
            } else {
              new_matrix_row.push(TREES)
            }
            break
          case LUMBERJACK:
            if (neighbors[LUMBERJACK] >= 1 && neighbors[TREES] >= 1) {
              new_matrix_row.push(LUMBERJACK)
            } else {
              new_matrix_row.push(OPEN)
            }
            break
          default:
            console.log('error default')
        }
      }
      new_matrix.push(new_matrix_row)
    }

    matrix = new_matrix

    acres.push(new_matrix)

    // output += getOutput(i, matrix) + '\n'

    let wooded = matrix.reduce((a, c) => a + c.filter(x => x === TREES).length, 0)
    let lumberjacks = matrix.reduce((a, c) => a + c.filter(x => x === LUMBERJACK).length, 0)
    let total = wooded * lumberjacks
    if (totals.includes(total)) {
      match_total = total
      break
    } else {
      totals.push(total)
    }

  } // end while

  let index = totals.indexOf(match_total)

  let loop_length = i - index

  // console.log(i, index);

  let index_2 = index + (1000000000 % loop_length)

  let acre = acres[index_2 -2]

  let wooded = acre.reduce((a, c) => a + c.filter(x => x === TREES).length, 0)
  let lumberjacks = acre.reduce((a, c) => a + c.filter(x => x === LUMBERJACK).length, 0)
  return wooded * lumberjacks


}

module.exports = {
  solve1, solve2
}