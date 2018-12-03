let fs = require('fs')
const path = require('path')

function makefile(arr) {
  let output = ''
  for (const line of arr) {
    for (const char of line) {
      if (!char) output += '.'
      else output += char === 'X' ? 'X' : '#'
    }
    output += '\n'
  }
  fs.writeFile(path.join(__dirname, './js_output.txt'), output, function (err) {
    if (err) return console.log(err)
    console.log("finished")
  })
}

function solve1(input) {
  input = input.split('\n')
  let arr = [...Array(1000)].map(x => Array(1000))
  let countx = 0
  for (const line of input) {
    let regex = /#(\d*) @ (\d*),(\d*): (\d*)x(\d*)/g
    let [t, id, x, y, width, height] = regex.exec(line)
    y = +y
    x = +x
    width = +width
    height = +height

    for (let row = 0; row < height; row++) {
      
      for (let col = 0; col < width; col++) {
        let mark = id
        if (arr[y + row][x + col]) {
          mark = 'X'
        }
        arr[y + row][x + col] = mark
        
      }
    }
  }

  for (const line of arr) {
    countx += line.filter(x => x === 'X').length
  }
  makefile(arr)
  return countx
}

function solve2(input) {
  input = input.split('\n')
  let arr = [...Array(1000)].map(x => Array(1000))

  for (const line of input) {
    let regex = /#(\d*) @ (\d*),(\d*): (\d*)x(\d*)/g
    let [, id, x, y, width, height] = regex.exec(line)
    y = +y
    x = +x
    width = +width
    height = +height

    for (let row = 0; row < height; row++) {
      
      for (let col = 0; col < width; col++) {
        let mark = id
        if (arr[y + row][x + col]) {
          mark = 'X'
        }
        arr[y + row][x + col] = mark
        
      }
    }
  }

  check:
  for (const line of input) {
    let regex = /#(\d*) @ (\d*),(\d*): (\d*)x(\d*)/g
    let [t, id, x, y, width, height] = regex.exec(line)
    y = +y
    x = +x
    width = +width
    height = +height

    for (let row = 0; row < height; row++) {      
      for (let col = 0; col < width; col++) {
        if (arr[y + row][x + col] === 'X') {
          continue check
        }
      }
    }
    return id
  }

}

module.exports = {
  solve1, solve2
}