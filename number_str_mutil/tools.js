var tools = {
  zeroStr: '000000000000000000000000000000000000000000000000000000000000',
  // is
  is(obj, tar) {
    return Object.prototype.toString.call(obj) === ('[object '+tar+']');
  },
  isNumber(num) {
    return this.is(num, 'Number');
  },
  isString(str) {
    return this.is(str, 'String');
  },
  isObject(obj) {
    return this.is(obj, 'Object');
  },
  isArray(arr) {
    return this.is(arr, 'Array');
  },
  isStringNumber(strNum) {
    if(!this.isString(strNum, 'String')) return false;
    return /^[0-9]+(\.[0-9]+)?$/.test(strNum) ? true : false;
  },

  // Number
  getIntNumber(num) {
    if (!this.isNumber(num) && !this.isStringNumber(num)) return null;
    let numStr = num + '';
    return numStr.split('.')[0];
  },
  getFloatNumber(num) {
    if (!this.isNumber(num) && !this.isStringNumber(num)) return null;
    let numSplit = (num + '').split('.');
    return numSplit[1] ? numSplit[1] : '';
  },

  // String
  /*
   * 让两个数字字符串保持相同长度
   * numA: 数字（或者数字字符串）
   * numB: 数字（或者数字字符串）
   * dir: 填充方向（ front or end) 默认 end
   * return  [numA_string, numB_string]
   */
  fillZero(numA, numB, dir) {
    let aLen = numA.length;
    let bLen = numB.length;
    let zeroStr = '000000000000000000000000000000000000000000000000000000000000'; // 60 位
    switch (dir) {
      case 'front': {
        if (aLen > bLen) {
          numB = zeroStr.slice(0, aLen - bLen) + numB;
        } else {
          numA = zeroStr.slice(0, bLen - aLen) + numA;
        }
        break;
      }
      default:
        if (aLen > bLen) {
          numB += zeroStr.slice(0, aLen - bLen);
        } else {
          numA += zeroStr.slice(0, bLen - aLen);
        }
    }
    return [numA, numB];
  },
  /*
   * 数字转字符串，计算相加结果
   * numA: 数字参数
   * numB: 数字参数
   * returnType: 返回类型（number: number, object: object） 默认 number
   *  object exp: {result: 123, dec:2}  result:相加的结果(未包含 最后一位相加的10进制 进位)  dec: 最后一位的进位数字 [0-9]
   *  number exp: 123456
   */
  numStrAdd(numA, numB, returnType) {
    // 数字长度统一
    let fixZeroNum = this.fillZero(numA, numB, 'front');
    // 字符串转数字
    let numAArr = (fixZeroNum[0] + '');
    let numBArr = (fixZeroNum[1] + '');
    let numC = [];
    let decNum = 0;
    let maxLen = numA.length > numB.length ? numA.length : numB.length;
    // 实现
    for (let idx = maxLen - 1; idx >= 0; idx--) {

      // 数字相加
      let sumNum = (numAArr[idx] - 0) + (numBArr[idx] - 0);
      // 计算加法后的 余数
      numC[idx] = (decNum + sumNum) % 10;
      // 进位 数字
      if(sumNum - 10 >= 0) {
        decNum = parseInt(sumNum / 10);
      }
      else {
        decNum = 0;
      }
    }
    // 进位 分开 返回
    if (returnType === 'object') {
      return {
        result: numC.join('').replace(/,/, ''),
        dec: decNum
      }
    }
    // 新增 进10 数字 进位
    else if (decNum > 0) {
      numC = [decNum].concat(numC);
    }
    return numC.join('').replace(/,/, '');
  },
  /*
   * 数字转字符串，计算相加结果
   * numA: 数字参数
   * numB: 数字参数
   * returnType: 返回类型（number: number, object: object） 默认 number
   *  · object exp: {result: 123, dec:2}  result:相加的结果(未包含 最后一位相加的10进制 进位)  dec: 最后一位的进位数字 [0-9]
   *  · number exp: 123456
   */
  floatNumAdd(numA, numB, returnType) {
    numA += '';
    numB += '';
    // 获取小数部分
    numA = this.getFloatNumber(numA);
    numB = this.getFloatNumber(numB);

    // 数字长度统一
    let fixZeroNum = this.fillZero(numA, numB);
    numA = fixZeroNum[0];
    numB = fixZeroNum[1];
    let sumNum = this.numStrAdd(numA, numB, 'object');

    if (returnType === 'object') {
      return sumNum;
    } else {
      return sumNum.result + '.' + sumNum.dec;
    }
  }
}

//兼容CommonJs规范
if (typeof module !== 'undefined' && module.exports) module.exports = tools;

//兼容AMD/CMD规范
if (typeof define === 'function') define(function() { return tools; });
