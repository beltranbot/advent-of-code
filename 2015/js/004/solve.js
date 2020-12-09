let md5 = require('blueimp-md5')

function solve1(n, zeros = 5, start = 0) {
  let answer = start
  let zero_string = [...Array(zeros)].map(x => '0').join('')
  while (true) {
    let key = n + answer
    hash = md5(key)

    if (zero_string === hash.substr(0, zeros)) {
      return answer
    }

    answer++
  }
}

function solve2(n) {
  return solve1(n, 6, 9000000)
}

module.exports = { solve1, solve2 } 