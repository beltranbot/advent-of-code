
const { GameMap } = require('./classes/GameMap')

function solve1(input) {
  let gameMap = new GameMap(input, elvesAttack = 3)

  while (true) {
    let results = gameMap.step()

    if (!results) {
      continue
    } else {
      return results.score
    }
  }

}

function solve2(input) {
  let i = 4

  while (true) {
    let gameMap = new GameMap(input, elvesAttack = i)
  
    while (true) {
      let results = gameMap.step()
  
      if (!results) {
        continue
      } else {

        if (results.fallenElves || results.winner === 'G') {
          i++
          break
        }
        return results.score
      }
    }
    // break
  }
}

module.exports = {
  solve1, solve2
}


// 190800

// answer
// 79 2621
// part 1: 207059