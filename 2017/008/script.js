var fs = require('fs')

fs.readFile('./data.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log(main(data.split('\r\n')))  
})

function main (data) {
  let obj = {}
  let maximum = 0

  for (const raw of data) {
    var line = raw.split(' if ')
    var instruction = line[0].split(' ')
    var condition = line[1].split(' ')

    if (obj[instruction[0]] === undefined) {
      obj[instruction[0]] = 0
    }
    if (obj[condition[0]] === undefined) {
      obj[condition[0]] = 0
    }
    
    line[0] = line[0].replace(/^(\w*)\s/g, 'obj["$1"] ')
                      .replace(/\s(inc)\s/, ' += ')
                      .replace(/\s(dec)\s/, ' -= ')

    line[1] = line[1].replace(/^(\w*)\s/g, 'obj["$1"] ')

    if (eval(line[1])) {
      eval(line[0])
      // part 2
      maximum = (obj[instruction[0]] > maximum) ? obj[instruction[0]] : maximum
    }
  }

  var max = 0
  
  for (const key in obj) {
    max = (obj[key] > max) ? obj[key] : max
  }
  console.log(obj)
  console.log('maximum held: ', maximum)
  
  return max
}