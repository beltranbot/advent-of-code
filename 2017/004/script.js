var fs = require('fs')

fs.readFile('./data.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  main(data.split('\r\n'))
})

function main (data) {
  var counter = 0
  for (let i = 0; i < data.length; i++) {
    // counter += highEntropy(data[i]) ? 1 : 0
    var valid = part2(data[i])
    counter += valid ? 1 : 0
  }
  console.log(counter)
}

function highEntropy (password) {
  var arr = password.split(' ')

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if ((i !== j) && (arr[i] === arr[j])) {
        return false
      }      
    }    
  }
  return true
}

function part2 (password) {
  var arr = password.split(' ')

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if ((i !== j) && (arr[i].length === arr[j].length)) {
        if (checkAnagram(arr[i], arr[j])) {
          return false
        }
      }
    }
  }
  return true
}

function checkAnagram (word1, word2) {
  var obj1 = {}
  var obj2 = {}

  for (var i = 0; i < word1.length; i++) {
    if (obj1[word1[i]] === undefined) {
      obj1[word1[i]] = 1
    } else {
      obj1[word1[i]]++
    }

    if (obj2[word2[i]] === undefined) {
      obj2[word2[i]] = 1
    } else {
      obj2[word2[i]]++
    }    
  }

  for (const key in obj1) {
    if (obj1[key] === obj2[key]) {
      continue
    } else {
      return false
    }
  }
  return true
}
