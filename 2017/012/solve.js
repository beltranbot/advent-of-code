function solve1 (data) {
  data = formatData(data)
  let set = new Set
  let count = 0
  set.add(data[0][0])
  set = processSet(set, data)

  return set.size
}

function solve2 (data) {
  data = formatData(data)
  let groups = []

  firstFor:
  for (let i = 0; i < data.length; i++) {
    let number = data[i][0]

    for (const group of groups) {
      if (group.has(number)) {
        continue firstFor
      }
    }

    let set = new Set
    set.add(data[i][0])
    set = processSet (set, data)
    groups.push(set)
  }

  return groups.length
}

function processSet (set, data) {
  for (const number of set) {
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === number) {
        data[i].forEach(x => set.add(x))
        break
      }
    }
  }
  return set
}

function formatData (data) {
  data = data.map(x => x.split(' <-> '))
  for (let i = 0; i < data.length; i++) {
    data[i][0] = parseInt(data[i][0])
    let children = data[i].pop().split(', ').map(Number)
    for (const child of children) {
      data[i].push(child)
    }
  }
  return data
}

module.exports = { solve1, solve2 }