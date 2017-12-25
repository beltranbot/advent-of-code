const assert = require('chai').assert
const rotate = require('../solve').rotate



describe('rotate', function () {
  
  describe('flip (n = 3)', function () {
    it('should return rule rotated 90° (n = 3)', function () {
      let rule = [
        '.#.',
        '..#',
        '###',
      ]
      let qRule = [
        '#..',
        '#.#',
        '##.',
      ]
      assert.deepEqual(rotate(rule), qRule)
    })
  })

  describe('flip (n = 3)', function () {
    it('should return rule rotated 180° (n = 3)', function () {
      let rule = [
        '#..',
        '#.#',
        '##.',
      ]
      let qRule = [
        '###',
        '#..',
        '.#.',
      ]
      assert.deepEqual(rotate(rule), qRule)
    })
  })
})
