const instructions = 'AND|RSHIFT|OR|NOT|LSHIFT'.split('|')

function setValue(dict, key, valA, operator = null, valB = null) {  
  valA = (isNaN(valA)) ? dict[valA] : parseInt(valA)
  if (valA === undefined) return false
  if (valB !== null) valB = (isNaN(valB)) ? dict[valB] : parseInt(valB)
  if (valB === undefined) return false

  if (operator === null) {
    dict[key] = (valA) & 0xffff
  } else if (operator === 'NOT') {
    dict[key] = (~valA) & 0xffff
  } else if (operator === 'AND') {
    dict[key] = (valA & valB) & 0xffff
  } else if (operator === 'OR') {
    dict[key] = (valA | valB) & 0xffff
  } else if (operator === 'RSHIFT') {
    dict[key] = (valA >> valB) & 0xffff
  } else if (operator === 'LSHIFT') {
    dict[key] = (valA << valB) & 0xffff
  }

  return true
}

function solve1 (n, initialB = null) {
  n = n.split('\r\n')
  n = n.map(x => [x, 0])
  let dict = {}

  for (let i = 0; i < n.length; i++) {
    let ins = n[i][0].split(' -> ')
    if (isNaN(ins[0])) continue
    let value = parseInt(ins[0])
    if (initialB !== null && ins[1] === 'b') value = initialB
    dict[ins[1]] = value
    n[i][1] = 1
  }
  let loops = 0

  while (n.reduce((a, c) => a + c[1], 0) < n.length) {
    for (let i = 0; i < n.length; i++) {
      if (n[i][1] === 1) continue

      let [ins, key] = n[i][0].split(' -> ')
      let regex =
        /^(\d*|\w*)?\s?(AND|RSHIFT|OR|NOT|LSHIFT)?\s?(\d*|\w*)?$/
      let arr = regex.exec(ins)
  
      // x -> y || 100 -> y
      if (arr[2] === undefined && arr[3] === undefined && isNaN(arr[1])) {
        if (setValue(dict, key, arr[1])) n[i][1] = 1
        continue
      }
      
      // NOT x -> y
      if (instructions.indexOf(arr[1]) !== -1) {
        if (setValue(dict, key, arr[3], arr[1])) n[i][1] = 1
        continue
      }
  
      // X INSTRUCTION Y -> Z
      if (instructions.indexOf(arr[2]) !== -1) {
        if (setValue(dict, key, arr[1], arr[2], arr[3])) n[i][1] = 1
        continue
      }
    }
  }

  return dict.a
}

function solve2 (n, initialB = null) {
  return solve1(n, initialB)

}

module.exports = { solve1, solve2 }