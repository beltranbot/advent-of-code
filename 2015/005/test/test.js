const assert = require('chai').assert
const checkRule1 = require('../solve').checkRule1

describe('rule1', function () {
  describe('check rthkunfaakmwmush', function () {
    it('should return false', function () {
      let word = 'rthkunfaakmwmush'
      assert.equal(checkRule1('aa', word), false)
    })
  })

  describe('check qjhvhtzxzqqjkmpb', function () {
    it('should return true', function () {
      let word = 'qjhvhtzxzqqjkmpb'
      assert.equal(checkRule1('qj', word), true)
    })
  })
})
