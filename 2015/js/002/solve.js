function solve1 (n) {
  n = n.split('\r\n').map(x => x.split('x').map(Number))
  let total = 0

  for (let i of n) {
    let areas = []
    areas.push(2 * i[0]*i[1])
    areas.push(2 * (i[1]*i[2]))
    areas.push(2 * (i[2]*i[0]))
    areas.sort((a, b) => a - b)
    areas.push(areas[0] / 2)
    
    total += areas.reduce((a, c) => a + c)
  }

  return total
}

function solve2 (n) {
  n = n.split('\r\n').map(x => x.split('x').map(Number))
  let ribbon = 0

  for (let i of n) {
    i.sort((a, b) => a - b)
    ribbon += ((2 * i[0]) + (2 * i[1])) + i.reduce((a, c) => a * c)
  }

  return ribbon
}

module.exports = {solve1, solve2}