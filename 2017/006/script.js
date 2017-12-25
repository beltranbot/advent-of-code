var fs = require('fs')

fs.readFile('./data.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log(main(data.split('\t')))
  // console.log(main(data.split('\r\n')))
})

function main (data) {
  var memory = []
  var steps = 0
  var length = data.length
  data = data.map(x => parseInt(x))
  memory.push(data.slice(0))

  while(true) {
    var sorted = data.slice(0).sort((a, b) => b - a)
    var i = 0

    for (const item of data) {      
      if (item === sorted[0]) {
        break
      }
      i++
    }

    var value = data[i]
    data[i] = 0

    for (var j = 0; j < value; j++) {
      var k = i + j + 1
      while (k >= length) {
        k -= length
      }
      data[k]++
    }

    steps++

    if (inMemory(steps)) {
      break
    }

    memory.push(data.slice(0))
  }

  function inMemory (step) {
    var pos = 0
    for (const arr of memory) {
      pos++
      if (arr.every((v, i) => v === data[i])) {
        console.log(pos, (memory.length + 1) - pos)
        return true
      }
    }
    return false
  }

  function printMemory () {
    for (const arr of memory) {
      console.log(arr)
    }
  }

  // printMemory()

  return steps
}