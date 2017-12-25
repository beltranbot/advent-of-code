const assert = require('chai').assert
const flip = require('../solve').flip

let rule = [
  '.#.',
  '..#',
  '###',
]

describe('flip', function () {
  describe('flip (n = 2)', function () {
    it('should return the flipped rule (n=2)', function () {
      let rule = [
        '.#',
        '#.'
      ]
      let qRule = [
        '#.',
        '.#'
      ]

      assert.deepEqual(flip(rule), qRule)
    })
  })

  describe('flip (n = 3)', function () {
    it('should return the flipped rule (n=3)', function () {      
      let qRule = [
        '.#.',
        '#..',
        '###',
      ]
      assert.deepEqual(flip(rule), qRule)
    })
  })
})
