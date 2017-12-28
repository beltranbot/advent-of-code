// a - 97
// z - 122
const BANNED_LETTERS = 'iol'.split('').map(x => x.charCodeAt(0))

function checkPasword (n) {
  return check2(n) && check1(n) && check3(n)
}

function check1 (n) {
  for (let i = 0; i < n.length - 2; i++) {
    if ((n[i] + 1) === n[i + 1] && (n[i] + 2) === n[i + 2]) return true
  }
  return false
}

function check2 (n) {
  for (const letter of BANNED_LETTERS) {
    if (n.indexOf(letter) !== -1) return false
  }
  return true
}
function check3 (n) {
  let counter = 0
  for (let i = 0; i < n.length - 1; i++) {
    if (n[i] === n[i + 1]) {
      counter++
      i++
    }
  }
  return (counter >= 2)
}

function addOne (n) {
  for (let i = n.length - 1; i >= 0; i--) {
    n[i]++
    if (n[i] <= 122) break
    n[i] = 97
  }
}

function solve1 (n) {
  n = n.split('').map(x => x.charCodeAt(0))
  
  while (true) {
    addOne(n)
    if (checkPasword(n)) break
  }
  return n.map(x => String.fromCharCode(x)).join('')
}

function solve2(n) {
  return solve1(n)
}

module.exports = {
  solve1, solve2
}