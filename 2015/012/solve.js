function solve1 (n) {
  let regex = /(-?\d+)/g

  return n.match(regex).reduce((a, c) => a + +c, 0)
}

function solve2(n) {  
  let i = 0
  n = JSON.parse(n, (key, value) => {
    console.log(key, value)
    if (!Array.isArray(value)) {
      return Object.keys(value).map(key => value[key]).indexOf('red') !== -1 ?
        {} : value
    }
    return value
  })
  let regex = /(-?\d+)/g

  return JSON.stringify(n).match(regex).reduce((a, c) => a + +c, 0)
}

module.exports = {
  solve1, solve2
}