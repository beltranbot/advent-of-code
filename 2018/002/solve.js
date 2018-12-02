const { buildObj } = require('../../libraries/utilities')

function solve1(input) {
  input = input.split('\n')
  let appear2 = 0
  let appear3 = 0

  for (const line of input) {
    let obj = buildObj(line)

    let count2 = Object.values(obj).filter(x => x === 2).length
    let count3 = Object.values(obj).filter(x => x === 3).length

    if (count2 > 0) {
      appear2++
    }
    if (count3 > 0) {
      appear3++
    }
  }

  return appear2 * appear3
}

function solve2(input) {
  input = input.split('\n')

  for (let i = 0; i < input.length; i++) {
    let line = input[i]
    let obj1 = buildObj(line)

    for (let j = 0; j < input.length; j++) {
      if (i === j) {
        continue
      }

      let line = input[j]
      let obj2 = buildObj(line)
      let diff = 0

      for (const key in obj2) {
        if (obj2[key] !== obj1[key]) {
          diff++
        }
        if (diff > 1) {
          break
        }
      }

      if (diff > 1) {
        continue
      }

      let ans = ''
      for (let k = 0; k < input[i].length; k++) {
        if (input[i][k] === input[j][k]) {
          ans += input[i][k]
        }
      }

      return ans
    }
  }
}

module.exports = {
  solve1, solve2
}
