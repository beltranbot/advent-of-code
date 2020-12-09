let Santa = require('./Santa')

function solve1 (n) {
  n = n.split('')
  let grid = [[1]]
  let rows = 1
  let cols = 1
  let x = 0
  let y = 0
  let dirs = {
    '^': 0,
    '>': 1,
    'v': 2,
    '<': 3,
  }
  let houses = 1

  for (let ins of n) {   
    x += [0, 1, 0, -1][dirs[ins]]
    y += [-1, 0, 1, 0][dirs[ins]]

    if (x < 0) {
      grid.map(row => row.unshift(0))
      cols++
      x = 0
    } else if (x >= cols){
      grid.map(row => row.push(0))
      cols++
    } else if (y < 0) {
      grid.unshift([...Array(cols)].map(i => 0))
      y = 0
      rows++
    } else if (y >= rows) {
      grid.push([...Array(cols)].map(i => 0))
      rows++
    }

    grid[y][x]++

    if (grid[y][x] === 1) houses++
  }  

  return houses
}

function solve2 (n) {
  n = n.split('')

  let santas = [
    new Santa('santa'),
    new Santa('robo_santa')
  ]

  let dirs = {
    '^': 0,
    '>': 1,
    'v': 2,
    '<': 3,
  }

  let grid = [[1]]
  let rows = 1
  let cols = 1
  let houses = 1

  for (let i = 0; i < n.length; i++) {
    let which = i % 2
    let which_not = (which + 1) % 2
    let x = santas[which]._x
    let y = santas[which]._y

    x += [0, 1, 0, -1][dirs[n[i]]]
    y += [-1, 0, 1, 0][dirs[n[i]]]

    if (x < 0) {
      grid.map(row => row.unshift(0))
      x = 0
      cols++
      santas[which_not]._x++
    } else if (x >= cols) {
      grid.map(row => row.push(0))
      cols++
    } else if (y < 0) {
      grid.unshift([...Array(cols)].map(i => 0))
      y = 0
      rows++
      santas[which_not]._y++
    } else if (y >= rows) {
      grid.push([...Array(cols)].map(i => 0))
      rows++
    }

    grid[y][x]++

    if (grid[y][x] === 1) houses++

    santas[which]._x = x
    santas[which]._y = y

  }
  return houses
}

module.exports = {solve1, solve2}