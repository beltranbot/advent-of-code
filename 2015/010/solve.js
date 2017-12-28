function lookAndSay (arr, times) {
  for (let i = 0; i < times; i++) {
    let newArr = []
    let val = arr[0]
    let count = 0
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] === val) {
        count++
      } else {
        newArr.push('' + count, val)
        count = 1
        val = arr[j]
      }
    }
    newArr.push('' + count, val)
    arr = newArr
  }
  return arr
}

function solve1 (n) {
  n = n.split('')
  return lookAndSay(n, 40).length
}

function solve2(n) {
  n = n.split('')
  return lookAndSay(n, 50).length
}

module.exports = {
  solve1, solve2
}