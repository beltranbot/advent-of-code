let order = []

function buildTable (n) {
  let table = {}
  let attendees = []
  n.forEach(element => {
    let regex = /^(\w+) .* (gain|lose) (\d+) .* (\w+)\.$/
    let arr = element.match(regex)

    if (table[arr[1]] === undefined) table[arr[1]] = {}
    if (attendees.indexOf(arr[1]) === -1) attendees.push(arr[1])
    if (attendees.indexOf(arr[4]) === -1) attendees.push(arr[4])
    table[arr[1]][arr[4]] = (arr[2] === 'gain') ? +arr[3] : -(+arr[3])
  })

  return [table, attendees]
}

function nextOrder () {
  // step 1
  let largestI = -1
  for (let i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) largestI = i
  }

  if (largestI === -1) return false

  // step 2
  let largestJ = -1
  for (let j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) largestJ = j
  }

  // step 3
  swap(order, largestI, largestJ)

  let arrEnd = order.splice(largestI + 1)
  arrEnd.reverse()
  order = order.concat(arrEnd)

  return true
}

function swap (arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function solve1 (n) {
  n = n.split('\r\n')
  let [table, attendees] = buildTable(n)
  let max_happiness = 0
  order = [...Array(attendees.length).keys()]

  do {
    let happiness = 0
    for (let i = 0; i < attendees.length; i++) {
      let a = (i === 0) ?
        attendees[order[order.length - 1]] : attendees[order[i - 1]]
      let b = attendees[order[i]]
      let c = ((i + 1) >= attendees.length) ?
        attendees[order[0]] : attendees[order[i + 1]]

      happiness += table[b][a]
      happiness += table[b][c]
    }
    if (happiness > max_happiness) max_happiness = happiness
  } while (nextOrder())

  return max_happiness
}

function includeMe (table, meKey) {
  table[meKey] = {}
  for (const key in table) {
    if (key === meKey) continue
    table[meKey][key] = 0
    table[key][meKey] = 0
  }
}

function solve2 (n) {
  n = n.split('\r\n')
  let [table, attendees] = buildTable(n)
  let max_happiness = []
  let best_order = []
  const meKey = 'Me'
  attendees.push(meKey)
  includeMe(table, meKey)
  order = [...Array(attendees.length).keys()]

  do {
    let happiness = 0
    for (let i = 0; i < attendees.length; i++) {
      let a = (i === 0) ?
        attendees[order[order.length - 1]] : attendees[order[i - 1]]
      let b = attendees[order[i]]
      let c = ((i + 1) >= attendees.length) ?
        attendees[order[0]] : attendees[order[i + 1]]

      happiness += table[b][a]
      happiness += table[b][c]
    }
    if (happiness > max_happiness) {
      max_happiness = happiness
      best_order = order.slice()
    }
  } while (nextOrder())

  return max_happiness
}

module.exports = {
  solve1, solve2
}