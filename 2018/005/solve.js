function solve1(input) {
  let output = []

  for (let i = 0; i < input.length; i++) {
    if (output.length === 0) {
      output.push(input[i])
      continue
    }

    let a = output[output.length - 1]
    let b = input[i]

    if (a.toLowerCase() === b.toLowerCase() && (a !== b)) {
      output.pop()
      continue
    }

    output.push(input[i])
  }

  return output.length
}

function solve2(input) {
  let arr_lens = []
  const letters = [...'abcdefghijklmnopqrstuvwxyz']

  for (const letter of letters) {
    let regex = new RegExp('[' + letter + letter.toUpperCase() + ']', 'g')
    let temp_input = input.replace(regex, '')
    arr_lens.push(solve1(temp_input))
  }

  return Math.min(...arr_lens)
}

module.exports = {
  solve1, solve2
}