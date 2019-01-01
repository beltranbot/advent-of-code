let fs = require('fs')
const path = require('path')
const { solve1 } = require('./solve')

const filename = 'input.txt'
// const filename = 'test-input.txt'

const input = fs.readFileSync(path.join(__dirname, filename), {
  encoding: 'utf-8'
})

console.time('solve1()')
let sol1 = solve1(input)
console.timeEnd('solve1()')