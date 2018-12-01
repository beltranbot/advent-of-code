function solve1(input) {
  input = input.split('\n').map(x => +x)
  return input.reduce((a,c) => a +c , 0)


}

function solve2 (input) {
  input = input.split('\n').map(x => +x)
  let frecuencies = []
  let ans = 0
  while (true) {
    for (let i = 0; i < input.length; i++) {
      ans += input[i]
      if (frecuencies.includes(ans)) {
        return ans
      } else {
        frecuencies.push(ans)
      }
    }
  }
}

module.exports = {
  solve1, solve2
}