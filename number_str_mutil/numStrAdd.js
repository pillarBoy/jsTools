var a = 328;
var b = 898;
var tools = require('./tools.js');

// number string number warning
function numCheck(num, msg) {
  if (!tools.isNumber(num) && !tools.isStringNumber(num)) {
    console.error(msg);
    return false;
  }
  return true;
}
// 字符串加法
function addNum(numA, numB) {
  // 检验参数是否合法
  if (!numCheck(numA, 'addNum function arg[0] must be number or number string') || !numCheck(numB, 'addNum function arg[1] must be number or number string')) {
    return;
  }

  numA += '';
  numB += '';

  // 先计算小数部分
  let dec = tools.floatNumAdd(numA, numB, 'object');
  // 计算整数部分
  let inNum = tools.numStrAdd(tools.getIntNumber(numA), tools.getIntNumber(numB));
  let result = (inNum - 0) + (dec.dec - 0) + '.' + dec.result;
  return result;
}

// addNum('12.23', '21.11')

// 字符串乘法
function multInt(numA, numB) {
  numA += '';
  numB += '';

  let maxLenNum =  0;
  let shortLenNum = 0;
  if (numA.length > numB.length) {
    maxLenNum = numA;
    shortLenNum = numB;
  } else {
    maxLenNum = numB;
    shortLenNum = numA;
  }
  //
  if (!numCheck(numA, 'addNum function arg[0] must be number or number string') || !numCheck(numB, 'addNum function arg[1] must be number or number string')) {
    return;
  }
  let sumArr = [];

  for (let idx = maxLenNum.length - 1, len = maxLenNum.length; idx >= 0; idx--) {
    let sum = 0;
    for (let key = shortLenNum.length - 1, lenB = shortLenNum.length;key >= 0; key--) {

      sum += (shortLenNum[key] * maxLenNum[idx] * Math.pow(10, lenB - key - 1));
    }
    if (idx < len - 1) {
      sum += tools.zeroStr.slice(0, len - idx - 1);
    }
    sumArr.push(sum + '');
  }

  let allSum = '';
  for (let idx = 0, len = sumArr.length; idx < len; idx++) {
    allSum = tools.numStrAdd(allSum, sumArr[idx]);
  }
  console.log(allSum);
}

multInt(12, 26)
// console.log();
