module.exports = class Node {

  constructor(n, pos, parent = null) {
    this._left = n[0]
    this._right = n[1]
    this._openPort = null
    this._strenght = this._left + this._right
    this._pos = pos
    this._children = []
    this._parent = parent
  }

  generateTree(n) {
    for (let i = 0; i < n.length; i++) {
      let node = new Node(n[i], i, this)
      this.addChild(node)
    }
    for (const child of this._children) {
      child.generateTree(n)
    }
  }

  addChild(node) {
    if (this.checkChild(node)) {
      node.setOpenPort((node._left === this._openPort) ? node._right : node._left)
      this._children.push(node)
    }
  }

  setOpenPort(openPort) {
    this._openPort = openPort
  }

  checkChild(node) {
    return this.checkPorts(node) && this.checkPosition(node)
  }

  checkPorts(node) {
    return (this._openPort === node._left) || (this._openPort === node._right)
  }

  checkPosition(node) {
    if (this._pos === node._pos) return false

    if (this._parent === null) return true

    return this._parent.checkPosition(node)
  }

  getMaxStrength() {
    let strenghts = [0]

    for (const child of this._children) {
      strenghts.push(child.getMaxStrength())
    }

    strenghts.sort((a, b) => b - a)
    return strenghts[0] + this._strenght
  }

  getMaxLength() {
    let lengths = [0]

    for (const child of this._children) {
      lengths.push(child.getMaxLength())
    }

    lengths.sort((a, b) => b - a)
    return lengths[0] + ((this._children.length > 0) ? 1 : 0)
  }

  getMaxLengthStrength() {
    let arr = [[0, 0]]

    for (const child of this._children) {
      arr.push(child.getMaxLengthStrength())
    }

    arr.sort((a, b) => (b[1] === a[1]) ? b[0] - a[0] : b[1] - a[1])

    return [
      arr[0][0] + this._strenght,
      arr[0][1] + ((this._children.length > 0) ? 1 : 0)
    ]
  }
}