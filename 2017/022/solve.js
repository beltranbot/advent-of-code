function solve1 (grid) {
  grid = grid.map(x => x.split(''))
  var virus = {
    x: Math.floor(grid[0].length / 2),
    y: Math.floor(grid.length / 2),
    face: 0
  }
  let burst = 0

  for (let i = 0; i < 10000; i++) {
    if (grid[virus.y][virus.x] === '#') {
      virus.face = (virus.face + 1) % 4
      grid[virus.y][virus.x] = '.'
    } else if (grid[virus.y][virus.x] === '.') {
      virus.face = (virus.face === 0) ? 3 : (virus.face - 1)
      grid[virus.y][virus.x] = '#'
      burst++
    }   

    switch (virus.face) {
      case 0:
        virus.y--        
        if (virus.y < 0) {
          grid.unshift([...Array(grid[0].length)].map(x => '.'))
          virus.y = 0
        }
        break
      case 1:
        virus.x++
        if (virus.x >= grid[0].length) {
          grid.map(x => x.push('.'))
        }
        break
      case 2:
        virus.y++
        if (virus.y >= grid.length) {
          grid.push([...Array(grid[0].length)].map(x => '.'))
        }
        break
      case 3:
        virus.x--
        if (virus.x < 0) {
          grid.map(x => x.unshift('.'))
          virus.x = 0
        }
        break
    }
  }

  return burst
}

function solve2 (grid) {
  grid = grid.map(x => x.split(''))
  var virus = {
    x: Math.floor(grid[0].length / 2),
    y: Math.floor(grid.length / 2),
    face: 0
  }
  let burst = 0

  for (let i = 0; i < 10000000; i++) {

    switch (grid[virus.y][virus.x]) {
      case '#':
        virus.face = (virus.face + 1) % 4
        grid[virus.y][virus.x] = 'F'
        break
      case '.':
        virus.face = (virus.face === 0) ? 3 : (virus.face - 1)
        grid[virus.y][virus.x] = 'W'
        break
      case 'F':
        virus.face = (virus.face + 2) % 4
        grid[virus.y][virus.x] = '.'
        break
      case 'W':
        grid[virus.y][virus.x] = '#'
        burst++
        break
    }

    switch (virus.face) {
      case 0:
        virus.y--
        if (virus.y < 0) {
          grid.unshift([...Array(grid[0].length)].map(x => '.'))
          virus.y = 0
        }
        break
      case 1:
        virus.x++
        if (virus.x >= grid[0].length) grid.map(x => x.push('.'))
        break
      case 2:
        virus.y++
        if (virus.y >= grid.length) {
          grid.push([...Array(grid[0].length)].map(x => '.'))
        }
        break
      case 3:
        virus.x--
        if (virus.x < 0) {
          grid.map(x => x.unshift('.'))
          virus.x = 0
        }
        break
    }
  }  

  return burst
}

module.exports = {solve1, solve2}