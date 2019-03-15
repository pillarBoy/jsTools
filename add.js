var assert = require('assert')

function add(a, b)  {
  return a + b
}

assert(add(1,2)===2, '验证没通过哦')
