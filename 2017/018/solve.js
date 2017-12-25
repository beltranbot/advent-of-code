function getVal(rs, v) {
  const num = parseInt(v)
  return isNaN(num) ? rs[v] : num
}

class Program {

  constructor(id, n) {
    this.n = n
    this.id = id
    this.rs = { p: id }
    this.q = []
    this.i = 0
    this.sent = 0
  }

  run () {
    let locked = true

    while (true) {
      const ins = this.n[this.i]
      switch (ins[0]) {
        case 'snd':
            this.sent++
            this.link.q.push(getVal(this.rs, ins[1]))
          break
        case 'set':
          this.rs[ins[1]] = getVal(this.rs, ins[2])
          break
        case 'add':
          this.rs[ins[1]] += getVal(this.rs, ins[2])
          break
        case 'mul':
          this.rs[ins[1]] *= getVal(this.rs, ins[2])
          break
        case 'mod':
          this.rs[ins[1]] %= getVal(this.rs, ins[2])
          break
        case 'rcv':
          if (this.q.length > 0) {
            this.rs[ins[1]] = this.q.shift()
          } else {
            return locked
          }
          break
        case 'jgz':
          if (getVal(this.rs, ins[1]) > 0) {
            this.i += getVal(this.rs, ins[2])
            this.i--
          }
          break
      }
      this.i++
      locked = false
    }
  }

  link (p) {
    this.link = p
  }
}

function solve2 (n) {
  n = n.split('\r\n').map(x => x.split(' '))

  const pA = new Program(0, n)
  const pB = new Program(1, n)

  pA.link(pB)
  pB.link(pA)

  while (true) {
    const aLocked = pA.run()
    const bLocked = pB.run()

    if (aLocked && bLocked) {
      break      
    }
  }
  console.log(pA, pB)

  return pB.sent

}

module.exports = {
  solve2
}