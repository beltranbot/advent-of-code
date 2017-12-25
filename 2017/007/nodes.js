var Node = function (name, weight) {
  this._name = name
  this._weight = weight
  this._children = []

  this.addChild = function (child) {
    this._children.push(child)
  }

  this.getName = _ => {
    return this._name
  }

  this.getChildren = function () {
    return this._children
  }
}