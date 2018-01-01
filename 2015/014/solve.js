const Rendeer = require('./Rendeer')

function generateRendeers (n) {
  let rendeers = []
  n.forEach(element => {
    let regex = /^(\w+) can fly (\d+) .* (\d+) seconds,.* (\d+) seconds.$/    
    let [input1, name, fly, seconds, rest, index, input2] = element.match(regex)
    rendeers.push(new Rendeer(name, +fly, +seconds, +rest))
  })
  return rendeers
}

function solve1(n, loops = 2503) {
  n = n.split('\r\n')
  let rendeers = generateRendeers(n)

  for (let i = 0; i < loops; i++) {
    for (let rendeer of rendeers) {
      rendeer.step()
    }
  }

  return rendeers.reduce((a, c) => (c._distance > a) ? c._distance : a, 0)
}

function solve2 (n, loops = 2503) {
  n = n.split('\r\n')
  let rendeers = generateRendeers(n)

  for (let i = 0; i < loops; i++) {
    let lead = 0
    for (let rendeer of rendeers) {
      rendeer.step()
      lead = (rendeer._distance > lead) ? rendeer._distance : lead
    }
    for (const rendeer of rendeers) {
      if (rendeer._distance === lead) rendeer.grantPoint()      
    }
  }

  return rendeers.reduce((a, c) => (c._points > a) ? c._points : a, 0)
}

module.exports = {
  solve1, solve2
}