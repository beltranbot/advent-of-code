function getVal(rs, v) {
  const num = parseInt(v)
  return isNaN(num) ? rs[v] : num
}

function solve1(n) {
  const rs = {
    a: 1,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
  }
  let sound = -1
  let i = 0
  let j = 0
  let mul = 0
  let counter = 0
  // n = n.split('\r\n').map(l => l.split(' '))
  n = n.map(l => l.split(' '))

  loop: while (true) {
    counter++
    
    const ins = n[i]
    console.log(ins, 'h:', rs.h, rs, i)
    if (counter > 40) break
    switch (ins[0]) {
      case 'snd':
        sound = getVal(rs, ins[1])
        i++
        break
      case 'set':
        rs[ins[1]] = getVal(rs, ins[2])
        i++
        break
      case 'add':
        rs[ins[1]] += getVal(rs, ins[2])
        i++
        break
      case 'sub':
        rs[ins[1]] -= getVal(rs, ins[2])
        i++
        break
      case 'mul':
        rs[ins[1]] *= getVal(rs, ins[2])
        i++
        mul++
        break
      case 'mod':
        rs[ins[1]] %= getVal(rs, ins[2])
        i++
        break
      case 'rcv':
        if (getVal(rs, ins[1]) !== 0) {
          break loop
        }
        i++
        break
      case 'jnz':
        let val = getVal(rs, ins[1])
        if (val !== undefined && val !== 0) {
          i += getVal(rs, ins[2])
        } else {
          i++
        }
        break
    }
  }

  // return sound
  return mul
}

function solve2 (n) {
  let a = 1
  let b = 67
  let c = 0
  let h = 0

  if (a !== 0)  {
    b *= 100
    b += 100000
    c = b
    c += 17000
  }

  for (let i = b; i <= c; i += 17) {
    for (let j = 2; j < b; j++) {
      if (i % j === 0) {
        h++
        break
      }
    }
    console.log('h', h)
  }

  return h
}

module.exports = {
  solve1, solve2
}