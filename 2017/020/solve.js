function formatData (data) {
  let particles = []
  for (const line of data) {
    let new_line = line.split(', ')
      .map(x => x.replace(/<(.*)>/, '$1'))
      .map(x => x.replace(/\w+=(-?\d+),(-?\d+),(-?\d+)/g, '$1 $2 $3'))
      .map(x => x.split(' '))
      .map(x => x.map(Number))

    particles.push(new_line)
  }
  return particles
}

function solve1 (data) {
  let particles = formatData(data)
  let distances = []

  for (const particle of particles) {
    for (let i = 0; i < 100000; i++) {
      particle[1][0] += particle[2][0]
      particle[1][1] += particle[2][1]
      particle[1][2] += particle[2][2]

      particle[0][0] += particle[1][0]
      particle[0][1] += particle[1][1]
      particle[0][2] += particle[1][2]      
    }
    distances.push(
      Math.abs(particle[0][0]) +
      Math.abs(particle[0][1]) +
      Math.abs(particle[0][2])
    )
  }

  return findMinPos(distances)
}

function findMinPos (distances) {
  var min = distances[0]
  var pos = 0
  for (let i = 0; i < distances.length; i++) {
    if (distances[i] < min) {
      min = distances[i]
      pos = i      
    }    
  }
  return pos
}

function solve2 (data) {
  let particles = formatData(data)
  let distances = []

  for (let i = 0; i < 10000; i++) {
    let delete_this = new Set

    // check collision
    for (let j = 0; j < particles.length; j++) {
      if (delete_this.has(j)) continue
      for (let k = 0; k < particles.length; k++) {
        if (delete_this.has(k)) continue
        if (j !== k) {
          let check_x = particles[j][0][0] === particles[k][0][0]
          let check_y = particles[j][0][1] === particles[k][0][1]
          let check_z = particles[j][0][2] === particles[k][0][2]

          if (check_x && check_y && check_z) {
            delete_this.add(j)
            delete_this.add(k)
          }          
        }
      } // for k
    } // for j

    let k = 0
    let str = ''

    // delete_this has to be ordered
    // an overlook?

    for (const index of delete_this) {
      str += index + ', '
      particles.splice(index + k, 1)
      k--
    }
    if (delete_this.size > 0) {
      console.log('set:', str.substr(0, str.length - 2))
      // console.log(delete_this)
      // console.log('splicing:', delete_this.size)
    }

    for (const particle of particles) {
      particle[1][0] += particle[2][0]
      particle[1][1] += particle[2][1]
      particle[1][2] += particle[2][2]

      particle[0][0] += particle[1][0]
      particle[0][1] += particle[1][1]
      particle[0][2] += particle[1][2]
    }
    
    if ((i % 1000) === 0) {
      // console.log('checked: ', i, particles.length)
    }
  }

  return particles.length
}

module.exports = { solve1, solve2 }