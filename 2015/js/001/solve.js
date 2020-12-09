function solve1 (n) {
  n = n.split('').reduce((a, c) => {
    return (isNaN(a) ? ((a === '(') ? 1 : -1) : a) +
      ((c === '(') ? 1 : -1)
  })

  return n
}

function solve2 (n) {
  n = n.split('')
  let floor = 0
  for (let i = 0; i < n.length; i++) {
    (n[i] === '(') ? floor++ : floor--
    if (floor === -1) {
      return (i + 1)
    }
  }
  return 0
}

module.exports = {solve1, solve2}