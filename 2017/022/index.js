var fs = require('fs')
const { solve1, solve2 } = require('./solve')
// const { solve1 } = require('./solve2')

// fs.readFile('./022/input.txt', 'utf8', function (err, data) {
fs.readFile('./022/input.txt', 'utf8', function (err, data) {
if (err) {
    return console.log(err)
  }
  main(data.split('\r\n'))
})

function main(data) {
  console.time('solve1()')
  let sol1 = solve1(data)
  console.timeEnd('solve1()')
  console.log('Part 1:', sol1)

  console.time('solve2()')
  let sol2 = solve2(data)
  console.timeEnd('solve2()')
  console.log('Part 2:', sol2)
}