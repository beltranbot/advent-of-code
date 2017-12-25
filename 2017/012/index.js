var fs = require('fs')
const { solve1, solve2 } = require('./solve')

fs.readFile('./012/input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  main(data.split('\r\n'))
})

function main(data) {
  console.time('Part 1')
  let sol1 = solve1(data)
  console.timeEnd('Part 1')
  
  console.time('Part 2')
  let sol2 = solve2(data)
  console.timeEnd('Part 2')

  console.log('Part 1:', sol1)
  console.log('Part 2:', sol2)
}
