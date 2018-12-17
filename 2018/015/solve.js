
const { GameMap } = require('./classes/GameMap')

function solve1(input) {
  let gameMap = new GameMap(input)

  while (true) {
    let score = gameMap.step()

    if (!score) {
      continue
    } else {
      return score
    }
  }

}

function solve2() {

}

module.exports = {
  solve1, solve2
}


// 190800

// answer
// 79 2621
// part 1: 207059