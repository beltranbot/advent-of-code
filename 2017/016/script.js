var fs = require('fs')

fs.readFile('./data.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log(main(data.split(',')))
})

function main(data) { 
  var arr = 'abcdefghijklmnop'.split('')
  var compare = ''
  var mod_value = 0

  for (let i = 0; i < 1000000000; i++) {
    var result = dance(arr, data)
    if (i === 0) {
      console.log(i + ':', result)
      compare = result
    }
    if (i !== 0 && result === compare) {
      mod_value = i
      break
    }
  }

  arr = 'abcdefghijklmnop'.split('')

  for (let j = 0; j < 1000000000 % mod_value; j++) {
    dance(arr, data)    
  }

  return '1000000000: ' + arr.join('')

  function dance (arr, data) {
    for (const ins of data) {
      switch (ins[0]) {
        case 's':
          spin(ins, arr)
          break
        case 'x':
          exchange(ins, arr)
          break
        case 'p':
          partner(ins, arr)
          break
      }
    }
    return arr.join('')
  }

  function exchange (ins, arr) {
    var pos = ins.replace(/x(\d*)\/(\d*)/, '$1 $2')
                  .split(' ').map(x => parseInt(x))
    swap(pos[0], pos[1], arr)
  }

  function partner (ins, arr) {
    var c = ins.replace(/p(\w)\/(\w)/, '$1 $2')
                .split(' ')
    var a = arr.indexOf(c[0])
    var b = arr.indexOf(c[1])
    swap(a, b, arr)
  }

  function swap (a, b, arr) {
    var temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
  }

  function spin (ins, arr) {
    var number = ins.split('')
    number.shift()
    number = parseInt(number.join(''))

    for (let i = 0; i < number; i++) {
      var c = arr.pop()
      arr.unshift(c)
    }
  }
}
