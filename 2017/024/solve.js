let Node = require('./Node')

function solve1 (n) {
  n = n.map(x => x.split('/')
    .map(Number))
  let strenghts = []

  for (let i = 0; i < n.length; i++) {
    if (n[i][0] === 0) {
      let root = new Node(n[i], i)
      root.setOpenPort(n[i][1])
      root.generateTree(n)
      strenghts.push(root.getMaxStrength())
    }
  }
  
  return strenghts.sort((a, b) => b - a)[0]
}

function solve2 (n) {
  n = n.map(x => x.split('/')
    .map(Number))
  let lengthStrengths = []

  for (let i = 0; i < n.length; i++) {
    if (n[i][0] === 0) {
      let root = new Node(n[i], i)
      root.setOpenPort(n[i][1])
      root.generateTree(n)
      lengthStrengths.push(root.getMaxLengthStrength())
    }
  }

  return lengthStrengths
    .sort((a, b) => (b[1] === a[1]) ? b[0] - a[0] : b[1] - a[1])[0]
}

module.exports = {
  solve1, solve2
}