function solve1(input) {
  input = input.split('\n').sort()
  
  let ids = {}
  let current_id = null
  let minute_asleep = 0
  let minute_wakes = 0

  for (let line of input) {
    let arr = line.split(' ')
    if (arr.includes('Guard')) {
      let regex = /.* Guard #(\d*) begins shift/g
      let [t, id] = regex.exec(line)
      current_id = id
      continue
    }
    if (arr.includes('asleep')) {
      let regex = /.*:(\d*).*/g
      let [t, minute] = regex.exec(line)
      minute_asleep = +minute
      continue
    }
    if (arr.includes('wakes')) {
      let regex = /.*:(\d*).*/
      let [t, minute] = regex.exec(line)
      minute_wakes = +minute

      let row = [...Array(60)].map(x => 0)
      for (let i = minute_asleep; i < minute_wakes; i++) {
        row[i] = 1
      }
      if (ids[current_id]) {
        ids[current_id]['shifts'].push(row)
        ids[current_id]['minutes'] += row.reduce((a, c) => a + c, 0)
      } else {
        ids[current_id] = {
          shifts: [row],
          minutes: row.reduce((a, c) => a + c, 0)
        }
      }

    }
  }

  let winner_id = -Infinity
  let winner_minutes = -Infinity

  for (let id in ids) {
    if (ids[id].minutes > winner_minutes) {
      winner_id = id
      winner_minutes = ids[id].minutes
      continue
    }
  }

  let minute_arr = [...Array(60)].map(x => 0)
  
  for (let i = 0; i < minute_arr.length; i++) {
    for (const shift of ids[winner_id].shifts) {
      minute_arr[i] += shift[i]
    }
  }

  let choosen_minute = 0
  let max_minutes = -Infinity
  for (let i = 0; i < minute_arr.length; i++) {
    if (minute_arr[i] > max_minutes) {
      choosen_minute = i
      max_minutes = minute_arr[i]
    }
    
  }

  return winner_id * choosen_minute
}

function solve2(input) {
  input = input.split('\n').sort()

  let ids = {}
  let current_id = null
  let minute_asleep = 0
  let minute_wakes = 0

  for (let line of input) {
    let arr = line.split(' ')
    if (arr.includes('Guard')) {
      let regex = /.* Guard #(\d*) begins shift/g
      let [t, id] = regex.exec(line)
      current_id = id
      continue
    }
    if (arr.includes('asleep')) {
      let regex = /.*:(\d*).*/g
      let [t, minute] = regex.exec(line)
      minute_asleep = +minute
      continue
    }
    if (arr.includes('wakes')) {
      let regex = /.*:(\d*).*/
      let [t, minute] = regex.exec(line)
      minute_wakes = +minute

      let row = [...Array(60)].map(x => 0)
      for (let i = minute_asleep; i < minute_wakes; i++) {
        row[i] = 1
      }
      if (ids[current_id]) {
        ids[current_id]['shifts'].push(row)
        ids[current_id]['minutes'] += row.reduce((a, c) => a + c, 0)
      } else {
        ids[current_id] = {
          shifts: [row],
          minutes: row.reduce((a, c) => a + c, 0)
        }
      }

    }
  }

  let winner_id = null
  let winner_minutes = -Infinity
  let winner_array = []
  
  for (const id in ids) {
    let minute_arr = [...Array(60)].map(x => 0)
  
    for (let i = 0; i < minute_arr.length; i++) {
      for (const shift of ids[id].shifts) {
        minute_arr[i] += shift[i]
      }
    }

    let max = Math.max(...minute_arr)
    if (max > winner_minutes) {
      winner_id = id
      winner_minutes = max
      winner_array = [...minute_arr]
    }
  }

  let winner_pos = null
  winner_minutes = -Infinity
  for (let i = 0; i < winner_array.length; i++) {
    if (winner_array[i] > winner_minutes) {
      winner_pos = i
      winner_minutes = winner_array[i]
    }
  }

  return winner_id * winner_pos
}

module.exports = {
  solve1, solve2
}