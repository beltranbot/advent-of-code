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

function applyOperations([a, b, c], registers) {
  let results = []
  let temp_register = [...registers]

  // addr
  registers[c] = registers[a] + registers[b]
  results.push([...registers])
  registers = [...temp_register]
  // addi
  registers[c] = registers[a] + b
  results.push([...registers])
  registers = [...temp_register]
  // mulr
  registers[c] = registers[a] * registers[b]
  results.push([...registers])
  registers = [...temp_register]
  // muli
  registers[c] = registers[a] * b
  results.push([...registers])
  registers = [...temp_register]
  // banr
  registers[c] = registers[a] & registers[b]
  results.push([...registers])
  registers = [...temp_register]
  // bani
  registers[c] = registers[a] & b
  results.push([...registers])
  registers = [...temp_register]
  // borr
  registers[c] = registers[a] | registers[b]
  results.push([...registers])
  registers = [...temp_register]
  // bori
  registers[c] = registers[a] | b
  results.push([...registers])
  registers = [...temp_register]
  // setr
  registers[c] = registers[a]
  results.push([...registers])
  registers = [...temp_register]
  // seti
  registers[c] = a
  results.push([...registers])
  registers = [...temp_register]
  // gtir
  registers[c] = a > registers[b] ? 1 : 0
  results.push([...registers])
  registers = [...temp_register]
  // gtri
  registers[c] = registers[a] > b ? 1 : 0
  results.push([...registers])
  registers = [...temp_register]
  // gtrr
  registers[c] = registers[a] > registers[b] ? 1 : 0
  results.push([...registers])
  registers = [...temp_register]
  // eqir
  registers[c] = a === registers[b] ? 1 : 0
  results.push([...registers])
  registers = [...temp_register]
  // eqri
  registers[c] = registers[a] === b ? 1 : 0
  results.push([...registers])
  registers = [...temp_register]
  // eqrr
  registers[c] = registers[a] === registers[b] ? 1 : 0
  results.push([...registers])
  registers = [...temp_register]

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
    let matches = countMatches(results, after)
    ans += matches >= 3 ? 1 : 0
  }

  return ans
}

function solve2() {

}

module.exports = {
  solve1, solve2
}