function solve1 () {
  const INPUT = '323081'
  let ninput = +INPUT
  const GOAL = ninput + 10

  let recipes = [3, 7]

  let i = 0
  let j = 1

  while(true) {
    let new_recipes = recipes[i] + recipes[j]
  
    for (const recipe of new_recipes.toString().split('')) {
      recipes.push(+recipe)
    }
    
    i = (i + recipes[i] + 1) % recipes.length
    j = (j + recipes[j] + 1) % recipes.length

    if (recipes.length >= GOAL) {
      let ans = []
      for (let i = recipes.length - 1; i >= recipes.length - 10; i--) {
        ans.push(recipes[i])
      }

      return ans.reverse().join('')
    }
  }

  return null
}

function solve2 () {
  const INPUT = '323081'
  const INPUT_LEN = INPUT.length

  let recipes = [3, 7]

  let i = 0
  let j = 1

  while(true) {
    let new_recipes = recipes[i] + recipes[j]
  
    for (const recipe of new_recipes.toString().split('')) {
      recipes.push(+recipe)

      if (recipes.length < INPUT_LEN) continue
      
      
      let ans = recipes.slice(recipes.length - INPUT_LEN, recipes.length)
      ans = ans.join('')

      if (INPUT === ans) {
        return recipes.length - INPUT_LEN
      }
    }
    
    i = (i + recipes[i] + 1) % recipes.length
    j = (j + recipes[j] + 1) % recipes.length
    
  }

  return null

}

module.exports = {
  solve1, solve2
}