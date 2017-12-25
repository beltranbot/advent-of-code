function solve1 (data) {
  data = data.split(',')
  let start = {
    x: 0,
    y: 0,
    z: 0,
  }
  let end = {
    x: 0,
    y: 0,
    z: 0
  }
  let max_distance = 0
  let c_distance = 0

  for (const step of data) {
    switch (step) {
      case 'n':
        end.y++
        end.z--
        break
      case 'ne':
        end.x++
        end.z--
        break
      case 'se':
        end.x++
        end.y--
        break
      case 's':
        end.y--
        end.z++
        break
      case 'sw':
        end.x--
        end.z++
        break
      case 'nw':
        end.x--
        end.y++
        break
    }
    c_distance = hexDistance(start, end)
    max_distance = (c_distance > max_distance) ?
      c_distance : max_distance
  }

  console.log('max distance:', max_distance)

  return hexDistance(start, end)

}

function hexDistance (start, end) { 
  return Math.max(
    Math.abs(end.x - start.x),
    Math.abs(end.y - start.y),
    Math.abs(end.z - start.z)
  )
}

module.exports = {
  solve1
}

// https://www.redblobgames.com/grids/hexagons/