var fs = require('fs')
const {solve2} = require('./solve')

fs.readFile('./018/data3.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  // main2(data.split('\r\n'))
  main2(data.split('\r\n'))
  // console.log(solve2(data))
})

function main1 (data) {
  let prog0 = {
    id: 0,
    i: 0,
    data: data.slice(),
    obj: {},
    lastSound: 0
  }

  while (true) {
    let lastSound = loop1(prog0)
    if (lastSound) {
      break
    }
  }

  console.log(prog0)

}

function loop1 (prog0) {
  let data = prog0.data
  let i = prog0.i
  let [ins, key, val] = data[i].split(' ')
  let obj = prog0.obj

  if (isNaN(key) && !obj[key]) {
    obj[key] = 0
  }

  function parseValue (obj, value) {
    if (isNaN(value)) {
      return obj[value]
    }
    return parseInt(value)
  }

  switch (ins) {
    case 'snd':
      prog0.lastSound = obj[key]
      break
    case 'set':
      obj[key] = parseValue(val)
      break
    case 'add':
      obj[key] += parseValue(val)
      break
    case 'mul':
      obj[key] *= parseValue(val)
      break
    case 'mod':
      obj[key] %= parseValue(val)
      break
    case 'rcv':
      if (obj[key] !== 0) {
        return prog0.lastSound
      }
      break
    case 'jgz':
      if (parseValue(key) !== 0) {
          prog0.i += (parseValue(val) - 1)
      }
      break
  }
  
  prog0.i++
  return null
}

function main2 (data) {
  let cero = {
    id: 0,
    i: 0,
    data: data.slice(),
    obj: {},
    lastSound: 0,
    sent: 0,
    recieved: [],
    waiting: false
  }
  let uno = {
    id: 1,
    i: 0,
    data: data.slice(),
    obj: {},
    lastSound: 0,
    sent: 0,
    recieved: [],
    waiting: false
  }
  var l1 = false
  var l2 = false

  while (true) {
    l1 = loop2(cero, uno)
    l2 = loop2(uno, cero)

    console.log(l1, l2)

    if (l1 && l2) {
      break
    }

  }
  console.log(cero, uno)
}

function loop2 (prog0, prog1) {
  
  function parseValue (auxobj, value) {
    const num = parseInt(value)
    return isNaN(num) ? auxobj[value] : num
  }
  
  let locked = true
  loop:
  while (true) {
    let [ins, key, val] = prog0.data[prog0.i].split(' ')
    // console.log(prog0.i, ins, key, val)

    if (isNaN(key) && !prog0.obj[key]) {
      if (key === 'p') {
        prog0.obj[key] = prog0.id
      } else {
        prog0.obj[key] = 0  
      }
    }

    switch (ins) {
      case 'snd':
        prog1.recieved.push(parseValue(prog0.obj, key))
        prog0.sent++      
        break
      case 'set':
        prog0.obj[key] = parseValue(prog0.obj, val)
        break
      case 'add':
        prog0.obj[key] += parseValue(prog0.obj, val)
        break
      case 'mul':
        prog0.obj[key] *= parseValue(prog0.obj, val)
        break
      case 'mod':
        prog0.obj[key] %= parseValue(prog0.obj, val)
        break
      case 'rcv':
        if (prog0.recieved.length > 0) {
          prog0.obj[key] = prog0.recieved.shift()
        } else {
          prog0.waiting = true
          console.log('retornoooooooooooooooo')
          return locked
        }
        break
      case 'jgz':
        if (parseValue(prog0.obj, key) !== 0) {
          prog0.i += parseValue(prog0.obj, val)
          prog0.i--
        }
        break
    }
    
    prog0.i++
    locked = false
  }
}