function solve1 (data) {
  let maze = []

  for (const line of data) {
    maze.push(line.split(''))
  }

  let x = maze[0].indexOf('|')
  let y = 1
  let cur_dir = 'down'
  let letters = []
  let maze_length = maze[0].length  
  let maze_height = maze.length
  let i = 1

  loop:
  while (true) {
    let cur_c = maze[y][x]
    switch (cur_dir) {
      case 'down':
        switch (cur_c) {
          case '-':
          case '|':
            y++
            break
          case '+':
            [cur_dir, x] = getNextDirLR(maze, y, x)
            break
          case ' ':
            break loop
          default:
            y++
            letters.push(cur_c)
            break
        }
        break // end down
      case 'left':
        switch (cur_c) {
          case '-':
          case '|':
            x--
            break
          case '+':
            [cur_dir, y] = getNextDirUD(maze, y, x)
            break
          case ' ':
            break loop
          default:
            x--
            letters.push(cur_c)
            break
        }
        break // end left
      case 'up':
        switch (cur_c) {
          case '-':
          case '|':
            y--
            break
          case '+':
            [cur_dir, x] = getNextDirLR(maze, y, x)
            break
          case ' ':
            break loop
          default:
            y--
            letters.push(cur_c)
            break
        }
        break // end up
      case 'right':
        switch (cur_c) {
          case '-':
          case '|':
            x++
            break
          case '+':
            [cur_dir, y] = getNextDirUD(maze, y, x)
            break
          case ' ':
            break loop
          default:
            x++
            letters.push(cur_c)
            break
        }
        break // end right
    } // end switch

    if ((x < 0 || x >= maze_length) || (y < 0 || y >= maze_height)) {
      break loop
    }
    console.log(x, y, i, cur_c, cur_dir)
    i++
  } // end while
  console.log('steps: ', i)
  return letters.join('')  
}

function getNextDirLR (maze, y, x) {
  if ((x - 1) >= 0 && maze[y][x - 1] === '-') {
    return ['left', --x]
  }
  return ['right', ++x]
}

function getNextDirUD (maze, y, x) {
  if ((y - 1) >= 0 && maze[y-1][x] === '|') {
    return ['up', --y]
  }
  return ['down', ++y]
}

module.exports = {
  solve1
}
