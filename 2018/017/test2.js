let fs = require('fs')
const path = require('path')
const { World } = require('./classes/World')

function getInput() {
  const filename = process.argv[2]

  const input = fs.readFileSync(path.join(__dirname, filename), {
    encoding: 'utf-8'
  })

  return input
}

function solve() {
  let input = getInput()
  input = input.split('\n')
  const world = new World(input)

  world.run()
}

solve()