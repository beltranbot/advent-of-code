const { World } = require('./classes/World')

function buildMatrix(input) {
  input = input.split('\n')

  let min_row = Infinity
  let max_row = -Infinity
  let min_col = Infinity
  let max_col = -Infinity

  let dunes = []

  for (const line of input) {
    let regex = /([xy])=(\d*), ([xy])=(\d*)..(\d*)/g
    let [, a, a1, b, b1, b2] = regex.exec(line)
    a1 = +a1
    b1 = +b1
    b2 = +b2

    if (a === 'y') {
      min_row = a1 < min_row ? a1 : min_row
      max_row = a1 > max_row ? a1 : max_row

      min_col = b1 < min_col ? b1 : min_col
      max_col = b2 > max_col ? b2 : max_col
    } else {
      min_col = a1 < min_col ? a1 : min_col
      max_col = a1 > max_col ? a1 : max_col

      min_row = b1 < min_row ? b1 : min_row
      max_row = b2 > max_row ? b2 : max_row
    }

    let dune = {}
    dune[a] = a1
    dune[b] = { start: b1, finish: b2 }

    dunes.push(dune)
  }

  let matrix = [...new Array(max_row + 1)].map(
    x => [...Array(max_col + 1)].map(
      y => '.'
    )
  )

  for (const dune of dunes) {
    let { x, y } = dune

    if (isNaN(x)) {
      for (let col = x.start; col <= x.finish; col++) {
        matrix[y][col] = '#'
      }
    } else {
      for (let row = y.start; row <= y.finish; row++) {
        matrix[row][x] = '#'
      }
    }
  }

  matrix[0][500] = '+'
  return {
    boundaries: {
      max_row,
      min_row,
      max_col,
      min_col
    },
    matrix
  }
}


function solve1(input) {
  let {matrix, boundaries} = buildMatrix(input)
  let world = new World(matrix)

  world.run()

  console.log('part1:', world.countReachedTiles(boundaries.min_row, boundaries.max_row))
  console.log('part2:', world.countReachedTiles(boundaries.min_row, boundaries.max_row, ['~']))



}

module.exports = {
  solve1
}