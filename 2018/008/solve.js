function solve1(input) {
  input = input.split(' ').map(x => +x)
  let ans = 0
  let i = 0

  function makeTree(input) {
    let obj = {}
    obj.n_children = input[i++]
    obj.n_metadata = input[i++]
    obj.children = []
    obj.metadata = []

    let j = obj.n_children

    while (j > 0) {
      obj.children.push(makeTree(input))
      j--
    }

    j = obj.n_metadata

    while (j > 0) {
      let metadata = input[i++]
      obj.metadata.push(metadata)
      ans += metadata
      j--
    }

    return obj
  }

  let obj = makeTree(input)

  return ans

}

function solve2(input) {
  input = input.split(' ').map(x => +x)
  let i = 0
  function makeTree(input) {
    let obj = {}
    obj.n_children = input[i++]
    obj.n_metadata = input[i++]
    obj.children = []
    obj.metadata = []
    obj.value = 0

    let j = obj.n_children

    while (j > 0) {
      obj.children.push(makeTree(input))
      j--
    }

    j = obj.n_metadata

    while (j > 0) {
      let metadata = input[i++]
      obj.metadata.push(metadata)
      j--
    }

    if (obj.n_children === 0) {
      obj.value = obj.metadata.reduce((a, c) => a + c, 0)
    } else {
      for(let index of obj.metadata) {
        if (obj.children[index - 1]) {
          obj.value += obj.children[index - 1].value
        }
      }
    }
    return obj
  }

  let obj = makeTree(input)
  return obj.value

}

module.exports = {
  solve1, solve2
}