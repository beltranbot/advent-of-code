var fs = require('fs')

const {solve1} = require('./solve')

fs.readFile('./011/input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  main(data)
})

function main (data) {
  let sol1 = solve1(data)
  console.log('Part1: ', sol1)

}

