const Rendeer = require('./Rendeer')

function generateRendeers (n) {
  let rendeers = []
  n.forEach(element => {
    let regex = /^(\w+) .* (\d+) .* (\d+) .* (\d+) .*$/    
    let [ , name, fly, seconds, rest, , ] = element.match(regex)
    rendeers.push(new Rendeer(name, +fly, +seconds, +rest))
  })
  return rendeers
}

function solve1(n, loops = 2503) {
  n = n.split('\r\n')
  let rendeers = generateRendeers(n)

  for (let i = 0; i < loops; i++) {
    rendeers.forEach(rendeer => rendeer.step())
  }

  return rendeers.reduce((a, c) => (c._distance > a) ? c._distance : a, 0)
}

function solve2 (n, loops = 2503) {
  n = n.split('\r\n')
  let rendeers = generateRendeers(n)

  for (let i = 0; i < loops; i++) {
    let lead = 0
    rendeers.forEach(rendeer => {
      rendeer.step()
      lead = (rendeer._distance > lead) ? rendeer._distance : lead
    })
    rendeers.forEach(rendeer =>
      (rendeer._distance === lead) ?
        rendeer.grantPoint() : 0
    )
  }

  return rendeers.reduce((a, c) => (c._points > a) ? c._points : a, 0)
}

module.exports = {
  solve1, solve2
}