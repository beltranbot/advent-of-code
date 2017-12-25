var obj1 = {
  value: 0
}

var obj2 = {
  value: 0
}

test(obj1, obj2)
console.log(obj1, obj2)
test(obj2, obj1)
console.log(obj1, obj2)

function test (objA, objB) {
  objA.value++
}