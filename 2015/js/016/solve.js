function solve1(input) {
  input = input.split('\n')

  let winner = null
  let matches = -Infinity

  const GOAL = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  }

  for (let line of input) {
    let regex = /Sue (\d*): (\w*): (\d*), (\w*): (\d*), (\w*): (\d*)/g
    let [, id, key1, value1, key2, value2, key3, value3] = regex.exec(line)
    let local_matches = 0

    if (GOAL[key1] && GOAL[key1] === +value1) local_matches++
    if (GOAL[key2] && GOAL[key2] === +value2) local_matches++
    if (GOAL[key3] && GOAL[key3] === +value3) local_matches++

    if (local_matches > matches) {
      matches = local_matches
      winner = id
    }
  }

  return winner

}

function solve2(input) {
  input = input.split('\n')

  let winner = null
  let matches = -Infinity

  const GOAL = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1,
  }

  for (let line of input) {
    let regex = /Sue (\d*):/g
    let [, id, , ,] = regex.exec(line)
    regex = /(\w+): (\d+)/g
    let local_matches = 0

    while (arr = regex.exec(line)) {
      let [key, value] = [arr[1], arr[2]]

      switch (key) {
        case 'cats':
        case 'trees':
          if (+value > GOAL[key]) {
            local_matches++
          }
          continue
        case 'pomerians':
        case 'goldfish':
          if (+value < GOAL[key]) {
            local_matches++
          }
          continue
        default:
          if (GOAL[key] && GOAL[key] === +value) {
            local_matches++
          }
      }

    }
    if (local_matches > matches) {
      matches = local_matches
      winner = id
    }
  }

  return winner
}

module.exports = {
  solve1, solve2
}