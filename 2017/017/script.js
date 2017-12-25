var steps = 370
console.log(main(steps))

function main(steps) {
  var list = [0]
  var pos = 0
  var cycles = 2018
  // var cycles = 50000000

  for (let i = 1; i < cycles; i++) {
    pos = (pos + steps + 1) % list.length

    var lower = list.splice(0, pos)

    lower.push(i)

    list = lower.concat(list)
  }

  return list[(pos + 1) % list.length]
}

function part2 (steps) {
  var b = 0
  var pos = 0
  for (let index = 0; index < 50000000; index++) {
    pos = (pos + steps + 1) % (index + 1)
    b = pos ? b : index + 1
    console.log(pos, index)
  }
  console.log(b)
}

/*
First part was another "type this as fast as possible" episode, but the second was good.
It's tricky because 50 million sounds like a reasonable number, but then you realize it takes O(n^2)
operations to build the buffer, since you need to do an O(n) shift on every iteration.
But since you only need to know the number that follows 0, and 0 is always the first thing in the buffer,
you only actually have to track the last thing written to index 1, and the number of things stored in the buffer so far.
*/