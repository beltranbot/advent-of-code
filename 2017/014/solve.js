function knotHash (data) {
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
    var arr = list.slice(i, i + 16)
    denseHash.push(arr.reduce((a, c) => a ^ c))
  }

  return denseHash.map(x => ('00' + x.toString(16)).substr(-2)).join('')
}

function solve1(input) {
  let used = 0
  let arr = [...Array(128).keys()]
    .map(n => knotHash(input + '-' + n))
    .map(hash => {
      let binary = ''
      for (let i = 0; i < hash.length; i += 4) {
        let arr = hash.split('').slice(i, i + 4)
          .map(x => ('0000' + parseInt(x, 16).toString(2)).substr(-4))
        binary += arr.join('')
      }
      return binary
    })
  arr.forEach(x => {
    used += x.split('').map(Number).reduce((a,b) => a + b)
  })

  return used
}

function solve2 (input) {
  let arr = [...Array(128).keys()]
    .map(n => knotHash(input + '-' + n))
    .map(hash => {
      let binary = ''
      for (let i = 0; i < hash.length; i += 4) {
        let arr = hash.split('').slice(i, i + 4)
          .map(x => ('0000' + parseInt(x, 16).toString(2)).substr(-4))
        binary += arr.join('')
      }
      return binary
    })
    .map(x => x.split(''))

    let regions = 0
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        regions += getRegion(arr, i, j)
      }
    }
  return regions
}

function getRegion(arr, i, j) {
  if (parseInt(arr[i][j]) === 0) return 0

  arr[i][j] = 0

  if ((j - 1) >= 0) getRegion(arr, i, j - 1)
  if ((i + 1) < arr[i].length) getRegion(arr, i + 1, j)
  if ((j + 1) < arr.length) getRegion(arr, i, j + 1)
  if ((i - 1) >= 0) getRegion(arr, i - 1, j)

  return 1
}

module.exports = {solve1, solve2}