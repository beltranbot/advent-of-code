// tried to solve the traveler salesperson probelm using a minimum reach tree
// don't look at this
function allNodesConnected (obj) {
  let val = true
  for (const key in obj) {
    val = val && obj[key]['connected']
  }
  return val
}

function removeBackLinks(table, origin) {
  for (const _origin in table) {
    for (const _destiny in table[_origin]) {
      if (_destiny === 'connected') continue
      if (_destiny === origin && table[_origin][_destiny].visited !== 1)
        table[_origin][_destiny].visited = -1
    }    
  }
}

function findShortestLink (table) {
  let min = Infinity
  let origin = ''
  let destiny = ''

  for (const _origin in table) {
    if (!table[_origin].connected) continue

    for (const _destiny in table[_origin]) {
      if (_destiny === 'connected') continue

      if (table[_origin][_destiny].visited === 0 &&
        table[_origin][_destiny].distance < min) {
        min = table[_origin][_destiny].distance
        origin = _origin
        destiny = _destiny
      }
    }
  }

  table[origin].connected = true
  table[destiny].connected = true
  table[origin][destiny].visited = 1

  for (const _destiny in table[origin]) {
    if (_destiny === 'connected') continue
    if (table[origin][_destiny].visited !== 1)
      table[origin][_destiny].visited = -1
  }

  return destiny

}
function findLongestLink (table) {
  let max = -1
  let origin = ''
  let destiny = ''
  let distances = []

  for (const _origin in table) {
    if (!table[_origin].connected) continue

    for (const _destiny in table[_origin]) {
      if (_destiny === 'connected') continue
      if (table[_origin][_destiny].visited === 0) 
        distances.push(table[_origin][_destiny].distance)

      if (table[_origin][_destiny].visited === 0 &&
        table[_origin][_destiny].distance > max) {
        max = table[_origin][_destiny].distance
        origin = _origin
        destiny = _destiny
      }
    }
  }

  table[origin].connected = true
  table[destiny].connected = true
  table[origin][destiny].visited = 1
  console.log(destiny, distances, table[origin][destiny].distance)
  // console.log('chosen', table[origin][destiny].distance)

  for (const _destiny in table[origin]) {
    if (_destiny === 'connected') continue
    if (table[origin][_destiny].visited !== 1)
      table[origin][_destiny].visited = -1
  }

  return destiny
}

function totalDistance (table) {
  let distance = 0

  for (const _origin  in table) {
    for (const _destiny in table[_origin]) {
      if (_destiny === 'connected') continue
      if (table[_origin][_destiny].visited === 1)
        distance += table[_origin][_destiny].distance
    }
  }
  return distance
}

function prepareDistancesTable (n) {
  let locations = {}
  let table = {}
  // define cities hash table
  for (const line of n) {
    let regex = /(\w*) to (\w*) = (\d*)/g
    let [temp1, origin, destiny, distance, index, temp2] = regex.exec(line)
    locations[origin] = false
    locations[destiny] = false
    table[origin] = {}
    table[destiny] = {}
  }

  // defines cities distances tables
  for (const location in locations) {
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
      table[location][distance.name] = {
        distance: distance.distance,
        visited: 0
      }
    }
    table[location].connected = false
  }
  return [locations, table]
}

function solve1 (n) {
  n = n.split('\r\n')
  let [locations, table] = prepareDistancesTable(n)
  let distances = []

  // checks every node as starting point and calculates distances for each one.
  for (const location in locations) {
    let clone = JSON.parse(JSON.stringify(table))
    clone[location].connected = true
    removeBackLinks(clone, location)
    while (!allNodesConnected(clone)) {
      removeBackLinks(clone, findShortestLink(clone, locations))
    }
    distances.push(totalDistance(clone))
  }

  return distances.sort((a, b) => a - b)[0]
}

function solve2 (n) {
  n = n.split('\r\n')
  let [locations, table] = prepareDistancesTable(n)
  let distances = []

  // checks every node as starting point and calculates distances for each one.
  for (const location in locations) {
    let clone = JSON.parse(JSON.stringify(table))
    clone[location].connected = true
    removeBackLinks(clone, location)
    while (!allNodesConnected(clone)) {
      removeBackLinks(clone, findLongestLink(clone, locations))
    }
    let distance = totalDistance(clone)
    distances.push(distance)
    console.log(distance)
  }

  // 764 too low

  return distances.sort((a, b) => b - a)[0]
}

module.exports = { solve1, solve2 }