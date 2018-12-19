const addr = ([a, b, c], registers) => registers[c] = registers[a] + registers[b]
const addi = ([a, b, c], registers) => registers[c] = registers[a] + b
const mulr = ([a, b, c], registers) => registers[c] = registers[a] * registers[b]
const muli = ([a, b, c], registers) => registers[c] = registers[a] * b
const banr = ([a, b, c], registers) => registers[c] = registers[a] & registers[b]
const bani = ([a, b, c], registers) => registers[c] = registers[a] & b
const borr = ([a, b, c], registers) => registers[c] = registers[a] | registers[b]
const bori = ([a, b, c], registers) => registers[c] = registers[a] | b
const setr = ([a, b, c], registers) => registers[c] = registers[a]
const seti = ([a, b, c], registers) => registers[c] = a
const gtir = ([a, b, c], registers) => registers[c] = a > registers[b] ? 1 : 0
const gtri = ([a, b, c], registers) => registers[c] = registers[a] > b ? 1 : 0
const gtrr = ([a, b, c], registers) => registers[c] = registers[a] > registers[b] ? 1 : 0
const eqir = ([a, b, c], registers) => registers[c] = a === registers[b] ? 1 : 0
const eqri = ([a, b, c], registers) => registers[c] = registers[a] === b ? 1 : 0
const eqrr = ([a, b, c], registers) => registers[c] = registers[a] === registers[b] ? 1 : 0

function applyOperations([a, b, c], registers, opcodesSet = new Set) {
  let results = []
  let temp_register = [...registers]

  // addr
  if (!opcodesSet.has('addr')) {
    addr([a, b, c], registers)
    results.push({ opcode: 'addr', registers: [...registers] })
    registers = [...temp_register]
  }
  // addi
  if (!opcodesSet.has('addi')) {
    addi([a, b, c], registers)
    results.push({ opcode: 'addi', registers: [...registers] })
    registers = [...temp_register]
  }
  // mulr
  if (!opcodesSet.has('mulr')) {
    mulr([a, b, c], registers)
    results.push({ opcode: 'mulr', registers: [...registers] })
    registers = [...temp_register]
  }
  // muli
  if (!opcodesSet.has('muli')) {
    muli([a, b, c], registers)
    results.push({ opcode: 'muli', registers: [...registers] })
    registers = [...temp_register]
  }
  // banr
  if (!opcodesSet.has('banr')) {
    banr([a, b, c], registers)
    results.push({ opcode: 'banr', registers: [...registers] })
    registers = [...temp_register]
  }
  // bani
  if (!opcodesSet.has('bani')) {
    bani([a, b, c], registers)
    results.push({ opcode: 'bani', registers: [...registers] })
    registers = [...temp_register]
  }
  // borr
  if (!opcodesSet.has('borr')) {
    borr([a, b, c], registers)
    results.push({ opcode: 'borr', registers: [...registers] })
    registers = [...temp_register]
  }
  // bori
  if (!opcodesSet.has('bori')) {
    bori([a, b, c], registers)
    results.push({ opcode: 'bori', registers: [...registers] })
    registers = [...temp_register]
  }
  // setr
  if (!opcodesSet.has('setr')) {
    setr([a, b, c], registers)
    results.push({ opcode: 'setr', registers: [...registers] })
    registers = [...temp_register]
  }
  // seti
  if (!opcodesSet.has('seti')) {
    seti([a, b, c], registers)
    results.push({ opcode: 'seti', registers: [...registers] })
    registers = [...temp_register]
  }
  // gtir
  if (!opcodesSet.has('gtir')) {
    gtir([a, b, c], registers)
    results.push({ opcode: 'gtir', registers: [...registers] })
    registers = [...temp_register]
  }
  // gtri
  if (!opcodesSet.has('gtri')) {
    gtri([a, b, c], registers)
    results.push({ opcode: 'gtri', registers: [...registers] })
    registers = [...temp_register]
  }
  // gtrr
  if (!opcodesSet.has('gtrr')) {
    gtrr([a, b, c], registers)
    results.push({ opcode: 'gtrr', registers: [...registers] })
    registers = [...temp_register]
  }
  // eqir
  if (!opcodesSet.has('eqir')) {
    eqir([a, b, c], registers)
    results.push({ opcode: 'eqir', registers: [...registers] })
    registers = [...temp_register]

  }
  // eqri
  if (!opcodesSet.has('eqri')) {
    eqri([a, b, c], registers)
    results.push({ opcode: 'eqri', registers: [...registers] })
    registers = [...temp_register]
  }
  // eqrr
  if (!opcodesSet.has('eqrr')) {
    eqrr([a, b, c], registers)
    results.push({ opcode: 'eqrr', registers: [...registers] })
    registers = [...temp_register]
  }

  return results
}

function solve1(input) {
  input = input.split('\n')

  let r0, r1, r2, r3 = 0
  let a, b, c = 0
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
    [, , a, b, c] = regex.exec(line)
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

  switch (opcode) {
    // addr  
    case 'addr':
      addr([a, b, c], registers)
      break
    // addi
    case 'addi':
      addi([a, b, c], registers)
      break
    // mulr
    case 'mulr':
      mulr([a, b, c], registers)
      break
    // muli
    case 'muli':
      muli([a, b, c], registers)
      break
    // banr
    case 'banr':
      banr([a, b, c], registers)
      break
    // bani
    case 'bani':
      bani([a, b, c], registers)
      break
    // borr
    case 'borr':
      borr([a, b, c], registers)
      break
    // bori
    case 'bori':
      bori([a, b, c], registers)
      break
    // setr
    case 'setr':
      setr([a, b, c], registers)
      break
    // seti
    case 'seti':
      seti([a, b, c], registers)
      break
    // gtir
    case 'gtir':
      gtir([a, b, c], registers)
      break
    // gtri
    case 'gtri':
      gtri([a, b, c], registers)
      break
    // gtrr
    case 'gtrr':
      gtrr([a, b, c], registers)
      break
    // eqir
    case 'eqir':
      eqir([a, b, c], registers)
      break
    // eqri
    case 'eqri':
      eqri([a, b, c], registers)
      break
    // eqrr
    case 'eqrr':
      eqrr([a, b, c], registers)
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