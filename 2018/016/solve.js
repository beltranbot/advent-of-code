function countMatches(results, after) {
  let matches = 0

  for (const result of results) {
    let match = true
    for (let i = 0; i < after.length; i++) {
      if (result[i] !== after[i]) {
        match = false
        break
      }
    }
    if (match) matches++
  }

  return matches
}

function applyOperations([a, b, c], registers, opcodesSet = new Set) {
  let results = []
  let temp_register = [...registers]

  // addr
  if (!opcodesSet.has('addr')) {
    registers[c] = registers[a] + registers[b]
    results.push({ opcode: 'addr', registers: [...registers] })
    registers = [...temp_register]
  }
  // addi
  if (!opcodesSet.has('addi')) {
    registers[c] = registers[a] + b
    results.push({ opcode: 'addi', registers: [...registers] })
    registers = [...temp_register]
  }
  // mulr
  if (!opcodesSet.has('mulr')) {
  registers[c] = registers[a] * registers[b]
    results.push({ opcode: 'mulr', registers: [...registers] })
    registers = [...temp_register]

  }
  // muli
  if (!opcodesSet.has('muli')) {
    registers[c] = registers[a] * b
    results.push({ opcode: 'muli', registers: [...registers] })
    registers = [...temp_register]
  }
  // banr
  if (!opcodesSet.has('banr')) {
    registers[c] = registers[a] & registers[b]
    results.push({ opcode: 'banr', registers: [...registers] })
    registers = [...temp_register]
  }
  // bani
  if (!opcodesSet.has('bani')) {
    registers[c] = registers[a] & b
    results.push({ opcode: 'bani', registers: [...registers] })
    registers = [...temp_register]
  }
  // borr
  if (!opcodesSet.has('borr')) {
    registers[c] = registers[a] | registers[b]
    results.push({ opcode: 'borr', registers: [...registers] })
    registers = [...temp_register]
  }
  // bori
  if (!opcodesSet.has('bori')) {
    registers[c] = registers[a] | b
    results.push({ opcode: 'bori', registers: [...registers] })
    registers = [...temp_register]
  }
  // setr
  if (!opcodesSet.has('setr')) {
    registers[c] = registers[a]
    results.push({ opcode: 'setr', registers: [...registers] })
    registers = [...temp_register]
  }
  // seti
  if (!opcodesSet.has('seti')) {
    registers[c] = a
    results.push({ opcode: 'seti', registers: [...registers] })
    registers = [...temp_register]

  }
  // gtir
  if (!opcodesSet.has('gtir')) {
    registers[c] = a > registers[b] ? 1 : 0
    results.push({ opcode: 'gtir', registers: [...registers] })
    registers = [...temp_register]
  }
  // gtri
  if (!opcodesSet.has('gtri')) {
    registers[c] = registers[a] > b ? 1 : 0
    results.push({ opcode: 'gtri', registers: [...registers] })
    registers = [...temp_register]
  }
  // gtrr
  if (!opcodesSet.has('gtrr')) {
    registers[c] = registers[a] > registers[b] ? 1 : 0
    results.push({ opcode: 'gtrr', registers: [...registers] })
    registers = [...temp_register]
  }
  // eqir
  if (!opcodesSet.has('eqir')) {
    registers[c] = a === registers[b] ? 1 : 0
    results.push({ opcode: 'eqir', registers: [...registers] })
    registers = [...temp_register]

  }
  // eqri
  if (!opcodesSet.has('eqri')) {
    registers[c] = registers[a] === b ? 1 : 0
    results.push({ opcode: 'eqri', registers: [...registers] })
    registers = [...temp_register]
  }
  // eqrr
  if (!opcodesSet.has('eqrr')) {
    registers[c] = registers[a] === registers[b] ? 1 : 0
    results.push({ opcode: 'eqrr', registers: [...registers] })
    registers = [...temp_register]
  }

  return results
}

function solve1(input) {
  input = input.split('\n')

  let r0, r1, r2, r3 = 0
  let opcode, a, b, c = 0
  let results = []
  let ans = 0
  let regex = null
  for (let i = 0; i < input.length - 1; i++) {
    let line = input[i++]
    if (line[0] !== 'B') break
    regex = /Before: \[(\d*), (\d*), (\d*), (\d*)\]/g;
    [, r0, r1, r2, r3] = regex.exec(line)

    line = input[i++]
    regex = /(\d*) (\d*) (\d*) (\d*)/g;
    [, opcode, a, b, c] = regex.exec(line)
    results = applyOperations([+a, +b, +c], [+r0, +r1, +r2, +r3])

    line = input[i++]
    regex = /After:  \[(\d*), (\d*), (\d*), (\d*)\]/g;
    let [, n0, n1, n2, n3] = regex.exec(line)
    let after = [+n0, +n1, +n2, +n3]
    let after_str = after.toString()
    let matches = results.filter(result => result.registers.toString() === after_str)
    ans += matches.length >= 3 ? 1 : 0
  }

  return ans
}

function applyOperation(opcode, [a, b, c], registers) {

  switch(opcode) {
    // addr  
    case 'addr':
      registers[c] = registers[a] + registers[b]
      break
    // addi
    case 'addi':
      registers[c] = registers[a] + b
      break
    // mulr
    case 'mulr':
      registers[c] = registers[a] * registers[b]
      break
    // muli
    case 'muli':
      registers[c] = registers[a] * b
      break
    // banr
    case 'banr':
      registers[c] = registers[a] & registers[b]
      break
    // bani
    case 'bani':
      registers[c] = registers[a] & b
      break
    // borr
    case 'borr':
      registers[c] = registers[a] | registers[b]
      break
    // bori
    case 'bori':
      registers[c] = registers[a] | b
      break
    // setr
    case 'setr':
      registers[c] = registers[a]
      break
    // seti
    case 'seti':
      registers[c] = a
      break
    // gtir
    case 'gtir':
      registers[c] = a > registers[b] ? 1 : 0
      break
    // gtri
    case 'gtri':
      registers[c] = registers[a] > b ? 1 : 0
      break
    // gtrr
    case 'gtrr':
      registers[c] = registers[a] > registers[b] ? 1 : 0
      break
    // eqir
    case 'eqir':
      registers[c] = a === registers[b] ? 1 : 0
      break
    // eqri
    case 'eqri':
      registers[c] = registers[a] === b ? 1 : 0
      break
    // eqrr
    case 'eqrr':
      registers[c] = registers[a] === registers[b] ? 1 : 0
      break
    default:
      console.log('error')
      break
  }
}

function solve2(input) {
  input = input.split('\n')

  let r0, r1, r2, r3 = 0
  let opcode, a, b, c = 0
  let results = []
  let ans = 0
  let regex = null
  let opcodes = {}
  let opcodesSet = new Set
  let j = 0
  for (let i = 0; i < input.length - 1; i++) {
    let line = input[i++]
    if (line[0] !== 'B') {
      j = i + 1
      break
    }
    regex = /Before: \[(\d*), (\d*), (\d*), (\d*)\]/g;
    [, r0, r1, r2, r3] = regex.exec(line)

    line = input[i++]
    regex = /(\d*) (\d*) (\d*) (\d*)/g;
    [, opcode, a, b, c] = regex.exec(line)
    results = applyOperations([+a, +b, +c], [+r0, +r1, +r2, +r3], opcodesSet)

    line = input[i++]
    regex = /After:  \[(\d*), (\d*), (\d*), (\d*)\]/g;
    let [, n0, n1, n2, n3] = regex.exec(line)
    let after = [+n0, +n1, +n2, +n3]
    let after_str = after.toString()
    let matches = results.filter(result => result.registers.toString() === after_str)
    if (matches.length === 1) {
      opcodes[opcode] = matches[0].opcode
      opcodesSet.add(matches[0].opcode)
    }
  }

  let registers = [null, null, null, null]

  for (let i = j; i < input.length; i++) {
    let line = input[i]
    let regex = /(\d*) (\d*) (\d*) (\d*)/g
    let [, opcode, a, b, c] = regex.exec(line)
    applyOperation(opcodes[opcode], [+a, +b, +c], registers)
  }

  return registers[0]
}

module.exports = {
  solve1, solve2
}