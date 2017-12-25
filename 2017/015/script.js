// main2()
main3()

function main () {
  var a = 116
  var b = 299
  var count = 0
  for (let i = 0; i < 40000000; i++) {
    a = (a * 16807) % 2147483647
    b = (b * 48271) % 2147483647

    if ((a & 0xffff) === (b & 0xffff)) {
      count++
    }
  }
  console.log(count)
}

function main2 () {
  var a = 116
  var b = 299
  var count = 0
  for (let i = 0; i < 5000000; i++) {
    a = (a * 16807) % 2147483647
    while(a % 4 !== 0) {
      a = (a * 16807) % 2147483647
    }
    b = (b * 48271) % 2147483647
    while(b % 8 !== 0) {
      b = (b * 48271) % 2147483647
    }

    if ((a & 0xffff) === (b & 0xffff)) {
      count++
    }
  }
  console.log(count)
}

function main3 () {
  var a = 40000000
  var b = 299
  a = a & 0xffff
  b = b & 0xffff

  console.log(a & 0xffff, b)
}