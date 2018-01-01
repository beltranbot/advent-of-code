let fs = require('fs')
const path = require('path')

function getIngridients (n) {
  let ingridients = []
  let properties = []
  n.forEach(element => {
    let regex = /(-?\d+)/g
    properties.push(element.match(regex).map(Number))
    regex = /^(\w+)/g
    ingridients.push(element.match(regex)[0])
  })
  
  return [ingridients, properties]
}

function solve1 (data) {
  data = data.split('\r\n')
  let [ingridients, properties] = getIngridients(data)
  let limit = 98
  let max_score = 0
  let str = ''

  for (let i = 1; i < limit; i++) {
    for (let j = 1; j < limit; j++) {
      for (let k = 1; k < limit; k++) {
        for (let l = 1; l < limit; l++) {
          if ((i + j + k + l) !== 100) continue
          str += `${i}, ${j}, ${k}, ${l}\n`
          let score = 1
          for (let m = 0; m < properties.length; m++) {
            let sum = 0
            for (let n = 0; n < properties.length; n++) {
              sum += [i, j, k, l][n] * properties[n][m]
            }
            score *= (sum < 0) ? 0 : sum
          }
          if (score > max_score) max_score = score
        }        
      }      
    }
  }
  
  // fs.writeFile(path.join(__dirname, './output.txt'), str, function (err) {
  //   if (err) return console.log(err)
  //   console.log('The file was saved!')
  // })

  return max_score
}

function solve2 (data) {
  data = data.split('\r\n')
  let [ingridients, properties] = getIngridients(data)
  let limit = 98
  let max_score = 0
  let str = ''

  for (let i = 1; i < limit; i++) {
    for (let j = 1; j < limit; j++) {
      for (let k = 1; k < limit; k++) {
        for (let l = 1; l < limit; l++) {
          if ((i + j + k + l) !== 100) continue
          let calories = properties.reduce(
            (a, c, index) => a + ([i, j, k, l][index]*c[4])
            , 0)
          if (calories !== 500) continue
          let score = 1
          for (let m = 0; m < properties.length; m++) {
            let sum = 0
            for (let n = 0; n < properties.length; n++) {
              sum += [i, j, k, l][n] * properties[n][m]
            }
            score *= (sum < 0) ? 0 : sum
          }
          if (score > max_score) max_score = score
        }        
      }      
    }
  }
  
  // fs.writeFile(path.join(__dirname, './output.txt'), str, function (err) {
  //   if (err) return console.log(err)
  //   console.log('The file was saved!')
  // })

  return max_score
}

module.exports = {
  solve1, solve2
}