const assert = require('chai').assert
const transpose = require('../solve').transpose

describe('transpose', function () {
  describe('transpose (n = 2)', function () {
    it('transpose matrix (n = 2)', function () {
      let rule = [
        '12',
        '34'
      ]
      let tRule = [
        '13',
        '24'
      ]
      assert.deepEqual(transpose(rule), tRule)
    })
  })
  describe('transpose (n = 3)', function () {
    it('transpose matrix (n = 3)', function () {
      let rule = [
        '123',
        '456',
        '789',
      ]
      let tRule = [
        '147',
        '258',
        '369',
      ]
      assert.deepEqual(transpose(rule), tRule)
    })
  })
})
