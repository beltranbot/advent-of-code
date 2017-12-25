var fs = require('fs')
const { solve1 } = require('./solve')

fs.readFile('./019/input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  main(data.split('\r\n'))
})

function main (data) {
  let sol1 = solve1(data)
  console.log(sol1)
}
