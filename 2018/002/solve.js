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
  let seenIds = new Set

  for (let i = 0; i < input.length; i++) {
    let line = input[i]
    let localIds = new Set

    for (let j = 0; j < line.length; j++) {
      let id = [...line]
      id.splice(j, 1)
      id = id.join('')
      localIds.add(id)
    }

    for (let id of localIds) {
      if (seenIds.has(id)) {
        return id
      } else {
        seenIds.add(id)
      }
    }
  }

  return 'not found'
}

module.exports = {
  solve1, solve2
}