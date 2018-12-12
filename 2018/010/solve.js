let fs = require('fs')
const path = require('path')

function writeOutput(output) {
  fs.writeFile(path.join(__dirname, './js_output.txt'), output, function (err) {
    if (err) return console.log(err)
    console.log("finished")
  })
}

function solve1(input) {
  input = input.split('\n')
  let min_x = Infinity
  let min_y = Infinity
  let max_x = -Infinity
  let max_y = -Infinity

  let points = []
  let id = 0

  for (const line of input) {
    let regex = /position=<((?:[\s-]*)\d*),((?:[\s-]*)\d*)> velocity=<((?:[\s-]*)\d*),((?:[\s-]*)\d*)>/g
    let [, x, y, vx, vy] = regex.exec(line).map((n, i) => {
      if (i == 0) return null
      return +n
    })

    min_x = x < min_x ? x : min_x
    min_y = y < min_y ? x : min_y
    max_x = x > max_x ? x : max_x
    max_y = y > max_y ? x : max_y

    points.push({ id, x, y, vx, vy })
    id++
  }

  const DIRS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1]
  ]


  let fit_x = min_x < 0 ? min_x * - 1 : -1 * min_x
  let fit_y = min_y < 0 ? min_y * - 1 : -1 * min_y

  for (const point of points) {
    point.x += fit_x
    point.y += fit_y
  }

  function getNeighbors(point, points, set, sets) {
    for (const dir of DIRS) {
      let temp_point = {
        id: point.id,
        y: point.y + dir[0],
        x: point.x + dir[1],
      }

      for (const point of points) {
        if (set.has(point.id)) continue
        if (inSets(point, sets)) continue
        if (point.x === temp_point.x && point.y === temp_point.y) {
          set.add(point.id)
          set = getNeighbors(point, points, set, sets)
        }
      }
    }
    
    return set
  }
  
  function inSets(point, sets) {
    for (const set of sets) {
      if (set.has(point.id)) return true
    }
    return false
  }
  
  let loops = 0
  const GOAL = 8

  while(true) {
    
    let sets = []
    let finished = true
  
    for (let i = 0; i < points.length; i++) {
      let point = points[i]
      let set = new Set
      if (inSets(point, sets)) continue
      set.add(point.id)
  
      set = getNeighbors(point, points, set, sets)

      if (set.size < GOAL) {
        finished = false
        break
      }
      sets.push(set)
    }

    if (finished) {
      printSets(sets)
      console.log('loops', loops)
      break
    }

    // advance one second
    for (let point of points) {
      point.x += point.vx
      point.y += point.vy
    }

    loops++
  }

  function getPoint(id) {
    for(let point of points) {
      if (point.id === id) return point
    }
    return null
  }

  function printSets(sets) {
    let max_row = -Infinity
    let max_col = -Infinity
    let min_row = Infinity
    let min_col = Infinity

    for (const set of sets) {
      for (let id of set) {
        let point = getPoint(id)
        max_row = point.y > max_row ? point.y : max_row
        max_col = point.x > max_col ? point.x : max_col
        min_row = point.y < min_row ? point.y : min_row
        min_col = point.x < min_col ? point.x : min_col
      }
    }
    let fit_y = min_row < 0 ? min_row * - 1 : -1 * min_row
    let fit_x = min_col < 0 ? min_col * - 1 : -1 * min_col

    let matrix = [...Array(max_row + fit_y + 1)].map(x => [...Array(max_col + fit_x + 1)].map(x => '.'))

    for (const set of sets) {
      for (let id of set) {
        let point = getPoint(id)
        point.y += fit_y
        point.x += fit_x
        matrix[point.y][point.x] = '#'
      }
    }

    let output = ''
    
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        output += matrix[row][col]
        
      }
      output += '\n'      
    }

    writeOutput(output)
  }
}

function solve2() {

}

module.exports = {
  solve1, solve2
}