function solve1(input) {
  input = input.split('\n')
  let obj = {}
  let ans = ''
  
  for(let line of input) {
    let regex = /Step (\w) must be finished before step (\w) can begin./g
    let [, pre, post] = regex.exec(line)
    if (!obj[pre]) obj[pre] = []

    obj[pre].push(post)
    obj[pre].sort()
  }

  let ordered_keys = Object.keys(obj).sort()

  let obj2 = {}
  for(let key of ordered_keys) {
    obj2[key] = obj[key]
  }

  obj = obj2

  function getKey(obj) {
    for (const key1 in obj) {
      let found = true
      for (const key2 in obj) {
        if (obj[key2].includes(key1)) {
          found = false
          break
        }
      }
      if (found) return key1
    }
  }
  while(Object.keys(obj).length > 0) {
    let id = getKey(obj)
    for (const key in obj) {
      if (obj[key].includes(id)) {
        let index = obj[key].indexOf(id)
        obj[key].splice(index, 1)
      }
    }
    ans += id
    if (Object.keys(obj).length === 1) {
      ans += obj[id][0]
    }
    delete obj[id]
  }
  
  return ans
}

function solve2 (input, n_workers = 5, step = 60) {
  input = input.split('\n')

  let obj = {}
  let ans = ''
  let char_a = 'A'.charCodeAt(0)  
  
  for(let line of input) {
    let regex = /Step (\w) must be finished before step (\w) can begin./g
    let [, pre, post] = regex.exec(line)
    if (!obj[pre]) obj[pre] = []

    obj[pre].push(post)
    obj[pre].sort()
  }

  let ordered_keys = Object.keys(obj).sort()

  let obj2 = {}
  for(let key of ordered_keys) {
    obj2[key] = obj[key]
  }

  obj = obj2

  function getKeys(obj) {
    let keys = []
    for (const key1 in obj) {
      let found = true
      for (const key2 in obj) {
        if (obj[key2].includes(key1)) {
          found = false
          break
        }
      }
      if (found) keys.push(key1)
    }

    return keys.sort()
  }
  let workers = []
  for (let i = 0; i < n_workers; i++) {
    workers.push(
      {letter: null, working: false, seconds: 0}
    )    
  }

  let seconds = 0
  let set = new Set
  let last = []
  while(Object.keys(obj).length > 0 || last.length > 0) {
    let arr = !last.length ? getKeys(obj) : last

    for (let i = 0; i < arr.length; i++) {
      let letter = arr[i]
      if (set.has(letter)) continue
      for(let worker of workers) {
        if(!worker.working) {
          worker.working = true
          worker.seconds = step + letter.charCodeAt(0) - char_a + 1
          worker.letter = letter
          set.add(letter)
          break
        }
      }
    }

    for(let worker of workers) {
      if (worker.working) {
        worker.seconds--

        if(worker.seconds === 0) {
          worker.working = false
          ans += worker.letter
          if (Object.keys(obj).length === 1) {
            last = [obj[worker.letter][0]]            
            
          } else if (Object.keys(obj).length === 0) {
            last.pop()
            continue
          }

          delete obj[worker.letter]
          set.delete(worker.letter)
          worker.letter = null
        }
      }
    }

    seconds++
  }

  return seconds
}

module.exports = {
  solve1, solve2
}

// YNQBASITFHPRJDECLOUKVMWXGZ
// GXWMZKVLUDCOEJRPHIFTSABQNY
// GLMVWXZDKOUCEJRHFAPITSBQNY