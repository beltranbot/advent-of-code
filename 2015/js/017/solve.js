let Combinatorics = require('../../libraries/combinatronics')

function solve(input) {
  input = input.split("\n").map(Number)
  let powerset = Combinatorics.power(input);
  let results = powerset.filter(list => {
    return list.reduce((a, c) => { return a + c }, 0) == 150
  })
  return results
}

function solve1(input) {
  let results = solve(input)
  return results.length
}

function solve2(input) {
  let results = solve(input)
  let minSize = results.reduce(function (a, b) {
    return (b.length < a) ? b.length : a
  }, Infinity)
  let results2 = results.filter(function (f) {
    return f.length == minSize
  })
  return results2.length
}

module.exports = {
  solve1, solve2
}