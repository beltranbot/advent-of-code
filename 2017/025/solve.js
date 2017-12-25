function solve1 (n) {
  let tape = [0]
  let pos = 0
  let checksum = 0
  let state = 'A'
  let limit = 12208951

  for (let checksum = 0; checksum < limit; checksum++) {
    switch (state) {
      case 'A':
        if (tape[pos] === 0) {
          tape[pos] = 1
          pos++
          state = 'B'
        } else {
          tape[pos] = 0
          pos--
          state = 'E'
        }
        break
      case 'B':
        if (tape[pos] === 0) {
          tape[pos] = 1
          pos--
          state = 'C'
        } else {
          tape[pos] = 0
          pos++
          state = 'A'
        }
        break
      case 'C':
        if (tape[pos] === 0) {
          tape[pos] = 1
          pos--
          state = 'D'
        } else {
          tape[pos] = 0
          pos++
          state = 'C'
        }
        break
      case 'D':
        if (tape[pos] === 0) {
          tape[pos] = 1
          pos--
          state = 'E'
        } else {
          tape[pos] = 0
          pos--
          state = 'F'
        }
        break
      case 'E':
        if (tape[pos] === 0) {
          tape[pos] = 1
          pos--
          state = 'A'
        } else {
          tape[pos] = 1
          pos--
          state = 'C'
        }
        break
      case 'F':
        if (tape[pos] === 0) {
          tape[pos] = 1
          pos--
          state = 'E'
        } else {
          tape[pos] = 1
          pos++
          state = 'A'
        }
        break
    }
    pos = expandTape(tape, pos)
  }
  return tape.reduce((a, c) => a + c)
}

function expandTape (tape, pos) {
  if (pos >= tape.length) { 
    tape.push(0)
  } else if (pos < 0) {
    tape.unshift(0)
    pos = 0
  }
  return pos
}

function solve2 (n) {
}

module.exports = {solve1, solve2}