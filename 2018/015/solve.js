
const { GameMap } = require('./classes/GameMap')

function solve1(input) {
  let gameMap = new GameMap(input)

  while (true) {

    gameMap.step()
    break
  }

}

function solve2() {

}

module.exports = {
  solve1, solve2
}