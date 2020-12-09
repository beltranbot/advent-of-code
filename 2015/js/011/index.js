const { solve1, solve2 } = require('./solve')
let input = 'hepxcrrq'

console.time('solve1()')
let sol1 = solve1(input)
console.timeEnd('solve1()')
console.log('Part 1:', sol1)

console.time('solve2()')
let sol2 = solve2(sol1)
console.timeEnd('solve2()')
console.log('Part 2:', sol2)