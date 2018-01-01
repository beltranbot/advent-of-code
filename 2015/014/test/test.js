let fs = require('fs')
const assert = require('chai').assert
const path = require('path')
const { solve1, solve2 } = require('../solve')

const input = fs.readFileSync(path.join(__dirname, '../test.txt'), {
  encoding: 'utf-8'
})

describe('solve2', function () {
  describe('solve2 test', function () {
    it('should return 689 points after 1000 loops', function () {
      assert.equal(solve2(input, 1000), 689)
    })
  })
})
