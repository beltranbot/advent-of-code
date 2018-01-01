module.exports = class Rendeer {

  constructor(name, fly, seconds, rest) {
    this._name = name
    this._fly = fly
    this._seconds = seconds
    this._rest = rest
    this._fly_counter = 0
    this._resting = false
    this._rest_counter = 0
    this._distance = 0
    this._points = 0
  }

  step () {
    (this._resting) ? this.rest() : this.fly()
  }

  fly () {
    this._fly_counter++
    this._distance += this._fly
    if (this._fly_counter >= this._seconds) {
      this._resting = true
      this._fly_counter = 0
    }
  }

  rest () {
    this._rest_counter++
    if (this._rest_counter >= this._rest) {
      this._resting = false
      this._rest_counter = 0
    }
  }

  grantPoint () {
    this._points++
  }
}