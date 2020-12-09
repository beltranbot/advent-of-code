const vowels = [...'aeiou']
const badWords = ['ab', 'cd', 'pq', 'xy']  

function isVowel (l) {
  return (vowels.indexOf(l) !== -1) ? 1 : 0
}

function checkBadWords (word) {
  return (badWords.indexOf(word) !== -1)
}

function isNice (vowels, rule2, rule3) {
  if (vowels < 3 || !rule2 || rule3) return 0
  return 1
}

function solve1 (n) {
  n = n.split('\r\n')
  let nice = 0
  for (const word of n) {
    let vowels = 0
    let rule2 = false
    let last = ''
    let rule3 = false
    for (const letter of word) {
      vowels += isVowel(letter)
      rule2 = rule2 || (last === letter)
      rule3 = rule3 || checkBadWords(last + letter)
      last = letter
    }
    nice += isNice(vowels, rule2, rule3)
  }
  return nice
}

function checkRule1 (seg, word) {
  if (seg.length !== 2) return false
  return (word.split(seg).length > 2)  
}

function checkRule2 (l, word) {
  for (let i = 0; i < word.length - 1; i++) {
    if (word[i] !== l) continue
    if (word[i] === word[i + 2]) return true
  }
  return false
}

function solve2 (n) {
  n = n.split('\r\n')
  let nice = 0
  for (const word of n) {
    let rule1  = false
    let rule2  = false
    let last = ''
    for (const letter of word) {
      rule1 = rule1 || checkRule1(last + letter, word)
      rule2 = rule2 || checkRule2(letter, word)
      last = letter
    }
    nice += (rule1 && rule2) ? 1 : 0
  }
  return nice
}

module.exports = { solve1, solve2, checkRule1 } 