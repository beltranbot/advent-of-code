// better solution for part one
// just calculating the smallest manhatan-distance accelaration

// doesn't consider cases with were particles share the acceleration vector tho
function solve1 (data) {
  let accelerations = []
  for (const particle of data) {
    let myRe = /a=<(.*),(.*),(.*)>/g;
    let arr = myRe.exec(particle)

    accelerations.push([
      parseInt(arr[1]),
      parseInt(arr[2]),
      parseInt(arr[3])
    ])
  }

  let distances = []

  for (const a of accelerations) {
    distances.push(
      Math.abs(a[0]) +
      Math.abs(a[1]) +
      Math.abs(a[2])
    )    
  }

  let min = distances[0]
  let pos = 0

  for (let i = 0; i < distances.length; i++) {
    if (distances[i] < min) {
      min = distances[i]
      pos = i
    }    
  }

  return pos
}

module.exports = {
  solve1
}