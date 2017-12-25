function formatData (data) {
  return data.map(x => x.split(': ').map(Number))
}

function calculateScannerPosition (length, i) {
  let base = (length - 1) * 2
  return i % base
}

function solve1 (data) {
  data = formatData(data)
  let firewall = {}
  let severity = 0

  for (const layer of data) {
    firewall[layer[0]] = layer[1]
  }
  
  for (const layer in firewall) {
    let i = parseInt(layer)

    if (calculateScannerPosition(firewall[layer], i) === 0) {
      severity += i * firewall[layer]
    }
  }

  return severity
}


function solve2 (data) {
  data = formatData(data)
  let firewall = {}

  for (const layer of data) {
    firewall[layer[0]] = layer[1]
  }

  let out = false
  let j = 0

  while (!out) {
    out = true
    
    for (const layer in firewall) {
      let i = parseInt(layer) + j
  
      if (calculateScannerPosition(firewall[layer], i) === 0) {
        out = false
        j++
        break
      }
    }
  }

  return j
}

module.exports = { solve1, solve2 }