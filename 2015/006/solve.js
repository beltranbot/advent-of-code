function solve1 (n) {
  n = n.split('\r\n')
  let grid = [...Array(1000)].map(x => [...Array(1000)].map(y => 0))
  
  
  for (const line of n) {
    let ins = line.split(' ')
    let regex = /(\d*,\d*) through (\d*,\d*)/g
    let arr = regex.exec(line)
    let [x1, y1] = arr[1].split(',').map(Number)
    let [x2, y2] = arr[2].split(',').map(Number)

    for (let i = y1; i <= y2; i++) {
      for (let j = x1; j <= x2; j++) {
        if (ins[0] === 'toggle') {
          grid[i][j] = (grid[i][j] + 1) % 2
        } else {
          grid[i][j] = (ins[1] === 'on') ? 1 : 0
        }
      }
    }
  }

  return grid.map(x => x.reduce((a, c) => a + c))
    .reduce((a, c) => a + c)
}

function solve2 (n) {
  n = n.split('\r\n')
  let grid = [...Array(1000)].map(x => [...Array(1000)].map(y => 0))


  for (const line of n) {
    let ins = line.split(' ')
    let regex = /(\d*,\d*) through (\d*,\d*)/g
    let arr = regex.exec(line)
    let [x1, y1] = arr[1].split(',').map(Number)
    let [x2, y2] = arr[2].split(',').map(Number)

    for (let i = y1; i <= y2; i++) {
      for (let j = x1; j <= x2; j++) {
        if (ins[0] === 'toggle') {
          grid[i][j] += 2
        } else {
          grid[i][j] += (ins[1] === 'on') ? 1 : -1
          if (grid[i][j] < 0) grid[i][j] = 0
        }
      }
    }
  }

  return grid.map(x => x.reduce((a, c) => a + c))
    .reduce((a, c) => a + c)
}
module.exports = { solve1, solve2 } 