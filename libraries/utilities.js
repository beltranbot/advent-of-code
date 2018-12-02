function buildObj (line) {
  let obj = {}
  for (const letter of line) {
    if (!obj[letter]) {
      obj[letter] = 1
    } else {
      obj[letter]++
    }
  }
  return obj
}

module.exports = {
  buildObj
}