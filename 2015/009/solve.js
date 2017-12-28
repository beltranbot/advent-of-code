let order

function prepareDistancesTable(n) {
  let locations = []
  let table = {}
  // define cities hash table
  for (const line of n) {
    let regex = /(\w*) to (\w*) = (\d*)/g
    let [temp1, origin, destiny, distance, index, temp2] = regex.exec(line)
    if (locations.indexOf(origin) === -1) locations.push(origin)
    if (locations.indexOf(destiny) === -1) locations.push(destiny)

    table[origin] = {}
    table[destiny] = {}
  }

  // defines cities distances tables
  for (const location of locations) {
    let column = []
    let distances = []
    for (const line of n) {
      let regex = /(\w*) to (\w*) = (\d*)/g
      let [temp1, origin, destiny, distance, index, temp2] = regex.exec(line)
      let row = {}
      if (origin === location) {
        row = { name: destiny, distance: parseInt(distance) }
      } else if (destiny === location) {
        row = { name: origin, distance: parseInt(distance) }
      }
      if (!(Object.keys(row).length === 0)) distances.push(row)
    }

    for (const distance of distances) {
      table[location][distance.name] = {distance: distance.distance}
    }
  }
  return [locations, table]
}

function nextOrder () {
  // step 1
  let largestI = -1
  for (let i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) largestI = i
  }

  if (largestI === -1) {
    return false
  }
  // step 2
  let largestJ = -1
  for (let j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) largestJ = j
  }

  // step 3
  swap(order, largestI, largestJ)

  //step 4
  let endArray = order.splice(largestI + 1)
  endArray.reverse()
  order = order.concat(endArray)

  return true
}

function swap (arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function solve1 (n) {
  n = n.split('\r\n')
  let [cities, table] = prepareDistancesTable(n)
  let min_distance = Infinity
  order = [...Array(cities.length).keys()]

  do {
    let distance = 0
    for (let i = 0; i < order.length - 1; i++) {
      let a = order[i]
      let b = order[i + 1]
      distance += table[cities[a]][cities[b]].distance
    }
    if (distance < min_distance) min_distance = distance
  } while (nextOrder())

  return min_distance
}

function solve2 (n) {
  n = n.split('\r\n')
  let [cities, table] = prepareDistancesTable(n)
  let max_distance = -1
  order = [...Array(cities.length).keys()]

  do {
    let distance = 0
    for (let i = 0; i < order.length - 1; i++) {
      let a = order[i]
      let b = order[i + 1]
      distance += table[cities[a]][cities[b]].distance
    }
    if (distance > max_distance) max_distance = distance
  } while (nextOrder())

  return max_distance
}

module.exports = {
  solve1, solve2
}