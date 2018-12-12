function getIPattern(current_state, i) {
  let ipattern = null
  if (i === 0) {
    ipattern = (
      '..' +
      current_state[i] +
      current_state[i + 1] +
      current_state[i + 2]
    )
  } else if (i === 1) {
    ipattern = (
      '.' +
      current_state[i - 1] +
      current_state[i] +
      current_state[i + 1] +
      current_state[i + 2]
    )
  } else if (i === current_state.length - 2) {
    ipattern = (
      current_state[i - 2] +
      current_state[i - 1] +
      current_state[i] +
      current_state[i + 1] +
      '.'
    )
  } else if (i === current_state.length - 1) {
    ipattern = (
      current_state[i - 2] +
      current_state[i - 1] +
      current_state[i] +
      '..'
    )
  } else {
    ipattern = (
      current_state[i - 2] +
      current_state[i - 1] +
      current_state[i] +
      current_state[i + 1] +
      current_state[i + 2] 
    )
  }

  return ipattern
}

function solve1(input) {
  input = input.split('\n')

  let initial_state = input.shift()
  let regex = /initial state: ([\.|#]*)/g
  let [, initial_pattern] = regex.exec(initial_state)

  initial_state = initial_pattern


  input.shift()

  let zero = null
  for (let i = 0; i < initial_state.length; i++) {
    if (initial_state[i] === '#') {
      zero = i
      break
    }
  }

  let patterns = []
  for (const line of input) {
    let regex = /(.*) => ([.|#])/g
    let [, pattern, value] = regex.exec(line)
    patterns.push({ value, pattern })
  }

  const generations = 20
  let generation = 1

  let current_state = initial_state

  while (generation <= generations) {

    if (current_state[0] === '#') {
      current_state = '..' + current_state
      zero += 2
    }
    if (current_state[current_state.length - 1] === '#') {
      current_state = current_state + '..'
    }

    let new_state = ''

    for (let i = 0; i < current_state.length; i++) {
      let ipattern = getIPattern(current_state, i)
      
      let found = false
      for (const item of patterns) {
        if (ipattern === item.pattern) {
          new_state += item.value
          found = true
          break
        }
      }
      if (!found) {
        new_state += '.'
      }
    }

    if (current_state === new_state) {
      break
    }
    
    current_state = new_state
    console.log(generation, current_state)
    generation++
  }

  let sum = 0
  for (let i = 0; i < current_state.length; i++) {
    if (current_state[i] === '#') {
      sum += i - zero
    }
  }

  return sum
}

function getSum(state, zero) {
  let sum = 0
  for (let i = 0; i < state.length; i++) {
    if (state[i] === '#') {
      sum += i - zero
    }
  }

  return sum
}

function solve2(input) {
  input = input.split('\n')

  let initial_state = input.shift()
  let regex = /initial state: ([\.|#]*)/g
  let [, initial_pattern] = regex.exec(initial_state)

  initial_state = initial_pattern


  input.shift()

  let zero = null
  for (let i = 0; i < initial_state.length; i++) {
    if (initial_state[i] === '#') {
      zero = i
      break
    }
  }

  let patterns = []
  for (const line of input) {
    let regex = /(.*) => ([.|#])/g
    let [, pattern, value] = regex.exec(line)
    patterns.push({ value, pattern })
  }

  const generations = 50000000000
  let generation = 1

  let prev_diff = 0
  let cur_diff = 0
  let prev_sum = 0

  let current_state = initial_state

  while (generation <= generations) {

    if (current_state[0] === '#') {
      current_state = '..' + current_state
      zero += 2
    }
    if (current_state[current_state.length - 1] === '#') {
      current_state = current_state + '..'
    }

    let new_state = ''

    for (let i = 0; i < current_state.length; i++) {
      let ipattern = getIPattern(current_state, i)
      
      let found = false
      for (const item of patterns) {
        if (ipattern === item.pattern) {
          new_state += item.value
          found = true
          break
        }
      }
      if (!found) {
        new_state += '.'
      }
    }

    let current_sum = getSum(current_state, zero)
    cur_diff = current_sum - prev_sum
    prev_sum = current_sum

    if (cur_diff === prev_diff) {
      break
    }
    prev_diff = cur_diff
    
    current_state = new_state
    
    generation++
  }

  let n = generations - generation
  return (prev_sum + prev_diff) + (prev_diff * n )
}

module.exports = {
  solve1, solve2
}