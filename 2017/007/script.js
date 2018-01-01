var fs = require('fs')

fs.readFile('./testdata.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }

  // console.log(main(data.split('\r\n')))
  console.log(main(data.split('\r\n')))
})

function main2 (data) {
  let arrs = []
  for (const line of data) {
    var arr = line.replace(/,/g, '').split(' ')
    if (arr.length > 2) {
      arrs.push(arr)
    }
  }

  var root_name = ''

  while (true) {
    for (var i = 0; i < arrs.length; i++) {
      console.log('searching...', arrs[i][0])
      if (!lookUpRow(arrs[i][0])) {
        root_name =arrs[i][0]
      }
    }
    break
  }

  return 0

  function lookUpRow(needle) {
    for (let i = 1; i < arrs.length; i++) {
      if (lookUpItems(i, needle)) {
        return true
      }
    }
    return false
  }


  function lookUpItems(index, needle) {
    for (let i = 1; i < arrs[index].length; i++) {
      if (arrs[index][i] === needle) {
        return true
      }
    }
    return false
  }
}

function Node (name, weight) {
  this._name = name
  this._weight = weight
  this._children = []
  this._balanced = false

  // methods
  this.addChild = function (child) {
    this._children.push(child)
  }

  this.nChildren = function () {
    return this._children.length
  }

  this.totalWeight = function () {
    var val = this._weight
    for (const child of this._children) {
      val += child.totalWeight()
    }
    return val
  }

  this.isBalanced = function () {
    var weights = []

    for (const child of this._children) {
      weights.push(child.totalWeight())
    }
    if (weights.length > 0) {
      var balance = weights[0]
      for (let i = 1; i < weights.length; i++) {
        if (balance !== weights[i]) {
          return false
        }
      }
    }
    return true
  }

  this.checkBalance = function (n) {
    if (!this.isBalanced()) {
      var str = ''
      for (let index = 0; index < n; index++) {
        str += ' '        
      }      
      console.log(str + this._name + ' (' + this._weight + ')' + ' ('+ this.totalWeight()+')')
      for (const child of this._children) {
        child.checkBalance(n + 4)
      }
    }
  }

  this.doBalance = function () {
    for (const child of this._children) {
      if (!child.isBalanced()) {
        return child.doBalance()
      }
    }
    return this
  }

  this.print = function () {
    console.log('parent:', this._name, this._weight, this.totalWeight())
    for (const child of this._children) {
      console.log('      ', child._name, ' ', child.totalWeight())
    }
  }
}

function main(data) {
  data = formatData(data)
  let rootName = getRootName(data)
  let tree = generateTree(data, rootName)
  var children = tree.doBalance()._children
  var wrongNode = null
  var diff = 0

  mainLoop:
  for (var i = 0; i < children.length; i++) {
    wrongNode = children[i]
    var failCount = 0
    for (let j = 0; j < children.length; j++) {
      if (i !== j && (children[i].totalWeight() !== children[j].totalWeight())) {
        failCount++
        if (failCount >= 2) {
          var a = children[i].totalWeight()
          var b = children[j].totalWeight()
          diff = (a > b) ? b - a : a - b
          break mainLoop
        }
      }
    }
  }

  console.log('Correct weight:', wrongNode._weight + diff)
  
  return rootName
}

function generateTree (data, root) {
  var node
  for (const arr of data) {
    if(arr[0] === root) {
      node = new Node(arr[0], parseInt(arr[1]))

      for (let i = 2; i < arr.length; i++) {
        var child = generateTree(data, arr[i])
        node.addChild(child)
      }
      break
    }
  }
  return node
}


function formatData (data) {
  let arrs = []
  for (const line of data) {
    var arr = line.replace(/,/g, '')
      .replace(/\(/g, '')
      .replace(/\)/g, '')
      .replace(/\s->\s/g, ' ')
      .split(' ')

    arrs.push(arr)
  }
  return arrs
}

function getRootName (data) {
  var rootName = ''

  mainLoop:
  for (var i = 0; i < data.length; i++) {
    // console.log('searching...', data[i][0], i)
    rootName = data[i][0]
    for (let j = 0; j < data.length; j++) {
      if (i !== j) {
        for (let k = 2; k < data[j].length; k++) {
          if (data[i][0] === data[j][k]) {
            continue mainLoop
          }
        }
      }
    }
    break
  }
  console.log('root: ', rootName)
  return rootName
}