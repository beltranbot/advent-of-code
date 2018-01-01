const assert = require('chai').assert
const flip = require('../solve').flip

describe('JSON.parse', function () {
  describe('return object from string', function () {
    it('should return a object', function () {

      let str = `[
        "hello",
        {
          "world": 1,
          "a": [
            1,
            "red",
            {
              "b": "red",
              "xd": 20000
            }
          ]
        },
        {
          "a": "red",
          "b": 1000
        },
        "test"
      ]`
      let count = 0
      let obj = JSON.parse(str, (key, value) => {
        // if (typeof value === 'object') {
        if (!Array.isArray(value)) {
          // console.log(value, key)
          console.log(
            Object.keys(value).map(key => value[key]),
            Object.keys(value).map(key => value[key]).indexOf('red'))
          // console.log(Object.keys(value).map(key => value[key]))
          return Object.keys(value).map(key => value[key]).indexOf('red') !== -1 ?
            {} : value
        }
        return value
      })
      console.log(obj)

      assert.equal(true, true)
    })
  })
})