class Nodo {
  constructor({
    row,
    col,
    value,
    world
  }) {

    this.row = row
    this.col = col
    this.value = value

    this.parent = null
    this.children = []

    this.world = world

  }

  down() {
    let { row, col } = this
    return this.world.matrix[row + 1][col]
  }

  left() {
    let { row, col } = this
    return this.world.matrix[row][col - 1]
  }

  right() {
    let { row, col } = this
    return this.world.matrix[row][col + 1]
  }

  addParent(node) {
    this.parent = node
    this.parent.children.push(this)
  }

  settleChildren() {
    for (const child of this.children) {
      if (this.world.nodesInclude(child)) {
        this.world.removeFromNodes(child, false)
      }
      if (child.value === '|') {
        child.value = '~'
      }
    }
  }

  getNextNode(dir) {
    if (dir === 'right') {
      return this.right()
    } else if (dir === 'left') {
      return this.left()
    }
  }

  spreadNext(dir) {
    let nn = this.getNextNode(dir)

    while (true) {

      if (['.', '|'].includes(nn.value)) {
        if (['#', '~'].includes(nn.down().value)) {
          nn.value = '|'
          if (nn.parent) {
            this.world.addToNodes(nn.parent, 'unshift')
            this.world.removeFromNodes(nn)
          }
          nn.addParent(this.parent)
          nn = nn.getNextNode(dir)
        } else if (nn.down().value === '.') {
          nn.value = '|'
          this.world.addToNodes(nn.down())
          nn.addParent(this.parent)
          nn.down().addParent(nn)
          break
        } else if (nn.down().value === '|') {
          break
        }
      }else if (nn.value === '#') {
        return true
      }
    }

    return false
  }

  spread() {
    
    let rb = this.spreadNext('right')
    let lb = this.spreadNext('left')

    if (rb && lb) {
      this.world.addToNodes(this.parent)
      this.parent.settleChildren()
    }

  }
}

module.exports = { Nodo }