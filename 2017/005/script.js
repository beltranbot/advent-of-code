var fs = require('fs')

fs.readFile('./data.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log(part2(data.split('\r\n')))
  // console.log(main(data.split('\r\n')))
})

function part2 (data) {
  var arr = data.map(x => parseInt(x))
  var steps = 0
  var i = 0
  var limit = 2000000
// 
  while (true) {
    var pos = i + arr[i]
    // console.log(arr[i], pos)
    steps++
    if (arr[i] >= 3) {
      arr[i]--
    } else {
      arr[i]++
    }

    if (pos >= arr.length || pos < 0) {
      return steps
    } else {
      i = pos
    }
  }
  return 0
}

function main (data) {
  var arr = data.map(x => parseInt(x))
  var steps = 0
  var i = 0
  var limit = 1000000

  while (true) {
    var pos = i + arr[i]
    console.log(arr[i], pos)
    steps++
    arr[i]++

    if (pos >= arr.length || pos < 0) {
      return steps
    } else {
      i = pos
    }

    if (steps > limit) {
      break
    }
  }
  return 0
}