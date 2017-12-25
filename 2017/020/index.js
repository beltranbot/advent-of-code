var fs = require('fs')
const { solve1, solve2 } = require('./solve')
// const { solve1 } = require('./solve2')

fs.readFile('./020/input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  main(data.split('\r\n'))
})

function main(data) {
  let sol1 = solve1(data)
  console.log('Part 1:', sol1)
  let sol2 = solve2(data)
  console.log('Part 2:', sol2)
}
