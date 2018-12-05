function solve1(input) {
  input = [...input]
  let i = 0
  let j = 1
  while (true) {
    let a = input[i]
    let b = input[j]

    if (a.toLowerCase() === b.toLowerCase()) {
      if (a !== b) {
        input.splice(i, 2)
        i = 0
        j = 1
        continue
      }
    }
    i++
    j++
    if (j >= input.length) break
  }
  return input.join('').length
}

function solve2(input) {
  const abc = [...'abcdefghijklmnopqrstuvwxyz']
  let lengths = []

  for(const letter of abc) {
    console.log('letter', letter)
    let arr = [...input].filter(x => x.toLowerCase() != letter).join('')
    lengths.push(solve1(arr))
  }

  return Math.min(...lengths)

}

module.exports = {
  solve1, solve2
}