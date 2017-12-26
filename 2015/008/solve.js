function solve1 (n) {
  n = n.split('\r\n')
  let total_string = 0
  let total_memory = 0

  for (const line of n) {
    total_string += line.length
    total_memory += (eval(line)).length    
  }

  return total_string - total_memory
}

function addSlashes (line) {
  return line.replace(/\\/g, '\\\\')
    .replace(/\\x/g, '\\x')
    .replace(/"/g, '\\"')
}

function solve2 (n) {
  n = n.split('\r\n')
  let total_string = 0
  let total_encoded = 0

  for (let line of n) {
    total_string += line.length
    line = '"' + addSlashes(line) + '"'
    total_encoded += line.length
  }

  return total_encoded - total_string
}

module.exports = { solve1, solve2 }