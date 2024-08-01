/**
 * @description check bitflag if it is 1 in flag
 * @param { number } flag
 * @param { number } bitFlag
 * @returns { boolean }
 */
export function checkBit(flag, bitFlag) {
    /*
    因为js位操作有关的超过了32位后无效。所有位置0。第32位代表负数。且32位的左移1位就是直接跳回到第1位。  与java long类型移位操作不符。
    20131225修改  支持long 类型62位内的checkBit
      */
    let bit_31 = true;
    //31位皆置1为：2147483647
    if (flag > 2147483647 || flag < 0 || bitFlag > 2147483647 || bitFlag < 0) {
        bit_31 = false;
    }
    if (bit_31) {
        return (flag & bitFlag) === bitFlag;
    }

    let flagBinary = flag.toString(2);
    let bitFlagBinary = bitFlag.toString(2);
    if (flagBinary.length > 62 || bitFlagBinary.length > 62) {
        console.error(
            'Does not support more than 62 bit. flagBinary.length=' +
            flagBinary.length +
            ',bitFlagBinary.length' +
            bitFlagBinary.length +
            '.',
        );
        return false;
    }
    let flagLow;
    let bitFlagHight;
    let bitFlagLow;
    let flagHight;
    let lowStr;
    let hightStr;
    flagHight = flagLow = bitFlagHight = bitFlagLow = 0;
    //拆分高低位处理
    if (flagBinary.length > 31) {
        hightStr = flagBinary.slice(0, flagBinary.length - 31);
        lowStr = flagBinary.slice(flagBinary.length - 31);
        flagHight = parseInt(hightStr, '2');
        flagLow = parseInt(lowStr, '2');
    } else {
        flagLow = parseInt(flagBinary.slice(0, flagBinary.length), '2');
    }
    if (bitFlagBinary.length > 31) {
        hightStr = bitFlagBinary.slice(0, bitFlagBinary.length - 31);
        lowStr = bitFlagBinary.slice(bitFlagBinary.length - 31);
        bitFlagHight = parseInt(hightStr, '2');
        bitFlagLow = parseInt(lowStr, '2');
    } else {
        bitFlagLow = parseInt(
            bitFlagBinary.slice(0, bitFlagBinary.length),
            '2',
        );
    }

    let result = (flagLow & bitFlagLow) === bitFlagLow;
    if (result) {
        result = (flagHight & bitFlagHight) === bitFlagHight;
    }
    return result;
}