var fs = require('fs')

fs.readFile('./data.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  // console.log(main(data.split(',')))
  console.log(main2(data))
})


function main (data) {
  data = data.map(Number)
  var len = 256
  var list = [...Array(len).keys()]
  var skip = 0
  var pos = 0

  data.map(x => {
    var arr = [...Array(x).keys()]
      .map((y, i) => list[(pos + i) % len])
      .reverse()
      .map((y, i) => list[(pos + i) % len] = y)
    pos += (x + skip) % len
    skip++
  })

  return list[0] * list[1]
}

function main2 (data) {
  data = data.split('')
    .map(x => x.charCodeAt(0)).concat([17, 31, 73, 47, 23])
  var len = 256
  var list = [...Array(len).keys()]
  var skip = 0
  var pos = 0

  for (let j = 0; j < 64; j++) {
    data.forEach(x => {
      var arr = [...Array(x).keys()]
        .map((y, i) => list[(pos + i) % len])
        .reverse()
        .forEach((y, i) => list[(pos + i) % len] = y)
      pos += x + skip
      skip++
    })
  }
  var denseHash = []
  for (let i = 0; i < list.length; i += 16) {
    var arr = list.slice(i, i + 16 )
    denseHash.push(arr.reduce((a, c) => a ^ c))
  }

  return denseHash.map(x => ('00' + x.toString(16)).substr(-2)).join('')
}