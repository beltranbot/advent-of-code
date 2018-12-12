function getCellPower(y, x, serialNumber) {
  let rackId = x + 10
  let power = rackId * y

  power += serialNumber
  power *= rackId
  power = [...power.toString()]

  let hundredsDigit = null
  if (power.length >= 3) {
    hundredsDigit = power[power.length - 3]
  } else {
    hundredsDigit = 0
  }

  return hundredsDigit - 5
}

function buildMatrix(y, x, serialNumber) {
  let matrix = []

  for (let row = 0; row < y; row++) {
    let matrix_row = []
    for (let col = 0; col < x; col++) {
      matrix_row.push(getCellPower(row, col, serialNumber))
    }
    matrix.push(matrix_row)
  }

  return matrix
}

function solve1() {
  const serialNumber = 6548
  const y = 300
  const x = 300

  let matrix = buildMatrix(x, y, serialNumber)

  const n = 3

  let max_power = -Infinity
  let max_row = null
  let max_col = null

  for (let row = 0; row < matrix.length - 2; row++) {
    for (let col = 0; col < matrix[row].length - 2; col++) {
      let power = 0
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          power += matrix[row + i][col + j]
        }
      }

      if (power > max_power) {
        max_power = power
        max_row = row
        max_col = col
      }
    }
  }

  console.log('power:', max_power)

  return `${max_col},${max_row}`
}

function getPowerOfGrid(matrix, row, col, n) {
  if (n === 1) {
    return matrix[row][col]
  }
  let power = 0

  for (let i = 0; i < n; i++) {
    if (matrix[row + i] === undefined) return -Infinity
    if (matrix[row + i][col + n - 1] === undefined) return -Infinity
    power += matrix[row + i][col + n - 1]

    if (matrix[row + n - 1] === undefined) return -Infinity
    if (matrix[row + n - 1][col + i] === undefined) return -Infinity
    power += matrix[row + n - 1][col + i]
  }

  power -= matrix[row + n - 1][col + n - 1]

  return power
}

function solve2() {
  const serialNumber = 6548
  const y = 300
  const x = 300

  let matrix = buildMatrix(x, y, serialNumber)

  const n = 300

  let max_power = -Infinity
  let max_row = null
  let max_col = null
  let size = null

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let power = 0

      for (let i = 1; i <= n; i++) {
        power += getPowerOfGrid(matrix, row, col, i)

        if (power > max_power) {
          max_power = power
          max_row = row
          max_col = col
          size = i
        }
      }
    }
  }

  console.log('power:', max_power)

  return `${max_col},${max_row},${size}`
}

function test() {
  let matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]

  const n = 4

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let power = 0
      console.log('evaluating', row, col)
      for (let i = 1; i <= n; i++) {
        power += getPowerOfGrid(matrix, row, col, i)
        console.log(i, power)
      }
      console.log('\n')
      // break
    }
    // break
  }

}

module.exports = {
  solve1, solve2,
  test
}