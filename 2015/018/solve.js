let { cloneMatrix } = require('../../libraries/utilities')

const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1]
]

function printMatrix(matrix) {
  let output = ''

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      output += matrix[row][col] ? '#' : '.'
    }
    output += '\n'
  }
  return output
}

function checkSurrounding(matrix, [row, col]) {
  let is_on = matrix[row][col] === 1
  let lights = DIRECTIONS.reduce((a, [y, x]) => {
    y = row + y
    x = col + x
    return a + ((matrix[y] && (matrix[y][x] === 1)) ? 1 : 0)
  }, 0)

  return (is_on ? [2, 3].includes(lights) : lights === 3) ? 1 : 0
}

function solve1(input) {
  input = input.split('\n').map(lines => lines.split('')).map(line => line.map(item => item === '#' ? 1 : 0))
  let matrix = cloneMatrix(input)
  let goal = 100

  while (goal > 0) {
    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[row].length; col++) {
        matrix[row][col] = checkSurrounding(input, [row, col])
      }
    }

    goal--
    input = cloneMatrix(matrix)
  }

  return matrix.reduce((a, c) => a + c.reduce((a, c) => a + c, 0), 0)
}

function solve2(input, goal = 100) {
  input = input.split('\n').map(lines => lines.split('')).map(line => line.map(item => item === '#' ? 1 : 0))

  const CORNERS = [
    [0, 0],
    [0, input[0].length - 1],
    [input.length - 1, 0],
    [input.length - 1, input[input.length - 1].length - 1]
  ]

  CORNERS.forEach(([row, col]) => input[row][col] = 1)

  let matrix = cloneMatrix(input)

  while (goal > 0) {
    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[row].length; col++) {
        if (CORNERS.some(([y, x]) => y === col && x === row)) {
          continue
        }
        matrix[row][col] = checkSurrounding(input, [row, col])
      }
    }
    
    goal--
    input = cloneMatrix(matrix)
  }

  return matrix.reduce((a, c) => a + c.reduce((a, c) => a + c, 0), 0)
}

module.exports = {
  solve1, solve2
}