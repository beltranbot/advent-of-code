main()

function main () {
  var number = 277678

  // console.log(manhattan(number))
  part2 (number)
}

function manhattan (number) {
  var sqrt = Math.round(Math.sqrt(number))

  if (sqrt % 2 === 0) {
    sqrt++
  }
  
  if (number > (sqrt * sqrt)) {
    sqrt++
  }
  
  var steps_to_edge = Math.floor(sqrt/2)
  var right_down_corner = sqrt * sqrt
  
  if (number === right_down_corner) {
    return steps_to_edge * 2
  }

  var answer = 0

  for (var i = 0; i < 8; i++) {
    var lower_bound = (i !== 7) ? right_down_corner - (steps_to_edge * (i + 1)) :
      (right_down_corner - (steps_to_edge * (i + 1))) + 1
    var upper_bound = right_down_corner - (steps_to_edge * i)
    
    if (i % 2 === 0 ) {
      if (number >= lower_bound && number <= upper_bound) {
        answer = steps_to_edge + Math.abs(lower_bound - number)
        break
      }
    } else {
      if (number >= lower_bound && number <= upper_bound) {
        answer = steps_to_edge + Math.abs(upper_bound - number)
      }
    }
  }
  return answer
}


function part2 (number) {

  function checkNumber (value) {
    if (value > number) {
      console.log('found:', value)
    }
  }

  function addTopRow () {
    var row0Length = matrix[0].length
    var newTopRow = [matrix[0][row0Length - 2] + matrix[0][row0Length - 1]]
    var ntrLength = newTopRow.length

    for (var i = 0; i < row0Length - 1; i++) {
      var value1 = newTopRow[0]
      var value2 = checkUndefined(matrix[0][matrix[0].length - 1 - i])
      var value3 = checkUndefined(matrix[0][matrix[0].length - 2 - i])
      var value4 = checkUndefined(matrix[0][matrix[0].length - 3 - i])
      var value = value1 + value2 + value3 + value4
      newTopRow.unshift(value)
      checkNumber(value)
    }

    var value = newTopRow[0] + matrix[0][0]

    newTopRow.unshift(value)
    matrix.unshift(newTopRow)
  }

  function addLeftColumn () {
    for (var i = 1; i < matrix.length; i++) {
      var value1 = matrix[i - 1][0] + matrix[i - 1][1]
      var value2 = matrix[i][0]
      var value3 = (matrix[i + 1] === undefined) ? 0 : matrix[i + 1][0]
      var value = value1 + value2 + value3

      matrix[i].unshift(value)
      checkNumber(value)
    }
  }

  function addBottomRow () {
    var lastRow = matrix.length - 1
    row0Length = matrix[0].length

    newBottomRow = [matrix[lastRow][0] + matrix[lastRow][1]]

    for (var i = 0; i < row0Length - 1; i++) {
      var nbrLength = newBottomRow.length - 1
      var value = newBottomRow[nbrLength]
      value += matrix[lastRow][i]
      value += matrix[lastRow][i + 1]
      value += checkUndefined(matrix[lastRow][i + 2])
      newBottomRow.push(value)
      checkNumber(value)
    }

    var value = newBottomRow[newBottomRow.length - 1] +
      matrix[lastRow][matrix[lastRow].length - 1]

    newBottomRow.push(value)
    checkNumber(value)

    matrix.push(newBottomRow)
  }

  function addRightColumn () {
    for (var i = matrix.length - 2; i >= 0; i--) {
      var lastRow = i + 1
      var pos = matrix[lastRow].length
      var value1 = matrix[lastRow][pos - 1] + matrix[lastRow][pos - 2]
      var value2 = matrix[i][matrix[i].length - 1]
      var value3 = (matrix[i - 1] === undefined) ? 0 :
        matrix[i - 1][matrix[i - 1].length - 1]
      var value = value1 + value2 + value3
      matrix[i].push(value)
      checkNumber(value)
    }
  }

  var matrix = [[1, 1]]

  while (matrix.length <= 10) {
    addTopRow()
    addLeftColumn()
    addBottomRow()
    addRightColumn()
  }
  // print(matrix)
}

function checkUndefined (number) {
  return (number === undefined) ? 0 : number
}

function print(matrix) {
  for (const row in matrix) {
    console.log(matrix[row])
  }
}