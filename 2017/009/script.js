var fs = require('fs')

fs.readFile('./data.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log(main(data))
})

function main(data) {
  data = data.split('')
  var c_value = 0
  var is_garbage = false
  var score = 0
  var gc_char = 0

  for (let i = 0; i < data.length; i++) {
    // console.log(data[i], is_garbage, score, c_value, gc_char)
    switch (data[i]) {
      case '{':
        if (!is_garbage) {
          c_value++
          score += c_value
        } else {
          gc_char++
        }
        break
      case '}':
        if (!is_garbage) {
          c_value--
        } else {
          gc_char++
        }
        break
      case '!':
        i++
        break
      case '<':
        if (!is_garbage) {
          is_garbage = true
        } else {
          gc_char++
        }
        break
      case '>':
        if (is_garbage)  {
          is_garbage = false
        }
        break    
      default:
        if (is_garbage) {
          gc_char++
        }
        continue
    }    
  }
  console.log('garbage char:', gc_char)
  return 'total score: ' + score
}
