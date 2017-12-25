function formatData (data) {
  // return data.map(line => line.split(' => ')).map(x => x.split('/'))
  return data.map(line => line.split(' => '))
    .map(x => x.map(y => y.split('/')))
}

function lookUpRule (picture, rules) {
  let p_length = picture.length
  let pos = 0

  for (let i = 0; i < rules.length; i++) {
    let rule = rules[i][0]
    if (rule.length === p_length && checkRule(rule, picture)) {
      pos = i
      break
    }    
  }

  var pic = []

  for (const line of rules[pos][1]) {
    pic.push(line)
  }

  return pic
}

function checkRule (rule, picture) {
  for (let i = 0; i < 8; i++) {
    if (i === 4) {
      rule = flip(rotate(rule))
    }
    if (testRule(rule, picture)) return true
    if (i === 7) return false
    rule = rotate(rule)
  }
  return false  
}

function testRule (rule, picture) {
  return rule.every((x, i) => x === picture[i])
}

function flip (rule) {
  return rule.map(x => x.split('').reverse().join(''))
}

function rotate (rule) {
  return flip(transpose(rule))
}

function transpose (rule) {
  let nRule = []

  for (let i = 0; i < rule.length; i++) {
    if (i === 0) {
      nRule = rule[i].split('').map(x => [x])
    } else {
      rule[i].split('').every((x, i) => nRule[i].push(x))
    }
  }

  return nRule.map(x => x.join(''))
}

function pixels (picture) {
  let pixels = 0

  for (const line of picture) {
    for (const c of line.split('')) {
      if (c === '#') pixels++
    }
  }

  return pixels
}

function solve1 (data, loops = 5) {
  let rules = formatData(data)
  let picture = [
    '.#.',
    '..#',
    '###',
  ]
  picture = picture.map(x => x.split(''))

  for (let i = 0; i < loops; i++) {
    let n = (picture.length % 2 === 0 ) ? 2 : 3
    let n_pic = []
    for (let j = 0; j < picture.length; j += n) {
      let t_arr = []
      for (let k = 0; k < picture.length; k += n) {
        let t_pic = []
        if (n === 2) {
          t_pic.push(
            [picture[j][k], picture[j][k + 1]].join(''),
            [picture[j + 1][k], picture[j + 1][k + 1]].join('')
          )
        } else {
          t_pic.push(
            [picture[j][k], picture[j][k + 1], picture[j][k + 2]].join(''),
            [picture[j + 1][k], picture[j + 1][k + 1], picture[j + 1][k + 2]].join(''),
            [picture[j + 2][k], picture[j + 2][k + 1], picture[j + 2][k + 2]].join(''),
          )
        }
        t_pic = lookUpRule(t_pic, rules)

        t_arr.push(t_pic)
      } // for k

      let aux_arr = []
      for (let j = 0; j < t_arr.length; j++) {
        for (let k = 0; k < t_arr[j].length; k++) {
          if (j === 0) {
            aux_arr.push(t_arr[j][k])
          } else {
            aux_arr[k] = aux_arr[k] + t_arr[j][k]
          }
        }
      }
      aux_arr.every(x => n_pic.push(x))
    } // for j

    picture = n_pic
  }

  return pixels(picture)
}

function solve2(data) {
  return solve1(data, 18)
}

module.exports = {
  solve1, solve2, flip, rotate, transpose
}