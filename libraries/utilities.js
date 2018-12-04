function cloneMatrix(matrix) {
  let new_matrix = []
  for (let row = 0; row < matrix.length; row++) {
    let new_row = []
    for (let col = 0; col < matrix[row].length; col++) {
      new_row.push(matrix[row][col])
    }
    new_matrix.push(new_row)
  }
  return new_matrix
}

function buildObj (line) {
  let obj = {}
  for (const letter of line) {
    if (!obj[letter]) {
      obj[letter] = 1
    } else {
      obj[letter]++
    }
  }
  return obj
}

module.exports = {
  cloneMatrix,
  buildObj,
}