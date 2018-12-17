class Node {

  constructor({row, col, value = null, previous = null, unit = null}) {

    this.f = 0
    this.g = 0
    this.h = 0

    this.row = row
    this.col = col
    this.previous = previous
    this.value = value

    this.unit = unit
  }

  isWall(enemy) {
    if (this.row === enemy.row && this.col === enemy.col)  {
      return false
    }
    return ['#', 'E', 'G'].includes(this.value)
  }

  addUnit(unit) {
    this.unit = unit
  }
}

module.exports = {Node}