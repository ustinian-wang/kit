import {safeJsonParse} from "./str.js";
import {isArray, isObject, isString} from "./typer.js";
import {cloneDeep, deepAssign} from "./clone.js";
import {TimeDef} from "./date";

/**
 * @description 格式化日期-时间
 * @param { Date } date
 * @returns { string }
 */
export function formatTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return (
        [year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
    );
};

/**
 * @description 数字格式化，少于10的补正为0x
 * @param { number } n
 * @returns { string }
 */
export function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}; //保留页面间的函数继承引用

/**
 * @description parse option of sharing action
 * @param {{scene:string}} option
 * @returns {{}}
 */
export function parseSharedOption(option) {
    console.log(option.scene);
    if (option.scene) {
        let value = decodeURIComponent(option.scene);
        let sharedOption = {};
        value.split('&').forEach(kv => {
            let kletr = kv.split('=');
            sharedOption[kletr[0]] = kletr[1];
        });
        return sharedOption;
    }
}

/**
 * @description 是否是空对象
 * @param { object } obj
 * @returns { boolean }
 */
export function isEmptyObj(obj) {
    return equals(obj, {});
}

/**
 * @description 用于对比两个数据是否相等，相等/相同，注意Date/RegExp可能会出问题
 * @param { any } a
 * @param { any } b
 * @returns { boolean }
 */
export function equals(a, b) {
    if (isObject(a) && isObject(b)) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    return a === b;
}

/**
 * @description 用于对比两个数据是否不相等，相等/相同，注意Date/RegExp可能会出问题
 * @param { any } a
 * @param { any } b
 * @returns { boolean }
 */
export function noEquals(a, b) {
    return !equals(a, b);
}



/**
 * @description 是否是空字符串
 * @param { string } value
 * @returns { boolean }
 */
export function isEmptyStr(value) {
    return isString(value) && value === '';
}

/**
 * @description promisfy wx api, 保留 success, fail模式, 并返回等价promise
 * @param {Function} api
 * @return {Function}
 */
export function promisify(api) {
    return (options = {}, ...params) => {
        return new Promise((resolve, reject) => {
            api(
                {
                    ...options,
                    success: function (...args) {
                        options.success && options.success(...args);
                        resolve(...args);
                    },
                    fail: function (...args) {
                        options.fail && options.fail(...args);
                        reject(...args);
                    },
                },
                ...params,
            );
        });
    };
}

/**
 * @description 计算中英文字符串长度，中文算两个长度
 * @param {string} str
 * @returns {number}
 */
export function getGbLen(str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
};

/**
 * @description 截取中英文字符串的特定长度
 * @param {string} str
 * @param {number} index
 * @param {boolean} [point=true]
 * @returns {string}
 */
export function subGbStr(str, index, point = true) {
    if (index >= getGbLen(str)) {
        return str;
    }

    let rtStr = '';
    for (let i = 0, count = 0; count < index; i++, count++) {
        rtStr += str[i];
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
            count++;
        }
    }
    if (point) {
        return rtStr + '...';
    } else {
        return rtStr;
    }
};

//
//
/**
 * @description 将字符串分成两行,第二行超出打点,lineMax:每行最多字符数；lineNo:行号,1开始
 * @param { string } str
 * @param { number } lineMax
 * @param { number } lineNo
 * @returns { string }
 */
export function divideGbStr2line(str, lineMax, lineNo) {
    const strLen = getGbLen(str);

    if (strLen <= lineMax) {
        if (lineNo == 1) {
            return str;
        } else {
            return '';
        }
    } else {
        let lineOne = subGbStr(str, lineMax, false);
        if (lineNo == 1) {
            return lineOne;
        } else {
            let lineElse = str.replace(lineOne, '');
            return subGbStr(lineElse, lineMax);
        }
    }
};

/**
 * @description 检查flag是否置起
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
        return (flag & bitFlag) == bitFlag;
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

    let result = (flagLow & bitFlagLow) == bitFlagLow;
    if (result) {
        result = (flagHight & bitFlagHight) == bitFlagHight;
    }
    return result;
};

/**
 * @description 睡眠一段时间
 * @param { number } delay
 * @returns { Promise<any> }
 */
export function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

/**
 * @description 睡眠一段时间
 * @param { number } second
 * @returns { Promise<any> }
 */
export function sleepSecond(second) {
    return sleep(second * TimeDef.SECOND);
}

/**
 * @description px转换为rpx
 * @param {number} value
 * @param {number} pageWidthPx
 * @return {number}
 */
export function pxToRpx(value, pageWidthPx) {
    let oneRpx = 750 / pageWidthPx;
    return value * oneRpx;
}

/**
 * @description 该方法会在首参为false，null，undefined，或空对象时返回true
 *
 * @deprecated 由于函数名不明确，函数定位模糊被废弃，请使用utils/tools/typer代替
 * @param {any} data
 * @returns {Boolean}
 */
export function isNull(data) {
    if (data == null || typeof data == 'undefined' || data === '') {
        return true;
    }
    return isEmptyObj(data);
}

/**
 * @description 解码
 * @export
 * @param {*} html
 * @return {*}
 */
export function decodeHtml(html) {
    return html && html.replace
        ? html
              .replace(/&nbsp;/gi, ' ')
              .replace(/&lt;/gi, '<')
              .replace(/&gt;/g, '>')
              .replace(/&#92;/gi, '\\')
              .replace(/&#39;/gi, "'")
              .replace(/&quot;/gi, '"')
              .replace(/<br\/>/gi, '\n')
              .replace(/&amp;/gi, '&')
        : html;
}

/**
 * @description 编码
 * @export
 * @param {*} html
 * @return {*}
 */
export function encodeHtml(html) {
    return html && html.replace
        ? html
            .replace(/&/g, '&amp;')
            .replace(/ /g, '&nbsp;')
            .replace(/\b&nbsp;+/g, ' ')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\\/g, '&#92;')
            // eslint-disable-next-line no-useless-escape
            .replace(/\'/g, '&#39;')
              // eslint-disable-next-line no-useless-escape
              .replace(/\"/g, '&quot;')
              .replace(/\n/g, '<br/>')
              .replace(/\r/g, '')
        : html;
};

/**
 * @description 格式化双精准？
 * @param { number } num
 * @param { number } scale
 * @param { '' | 'ceil' | 'floor' | 'parseFloat' | 'makeUp' } roundingMode
 * @param { boolean } positive
 * @param { number } complement
 * @returns { * }
 */
export function formatDouble(
    num,
    scale = 2,
    roundingMode = '',
    positive,
    complement = 2,
) {
    num = parseFloat(num);

    if (isNaN(num)) {
        num = 0;
    }

    let res = num;

    if (positive && res < 0) {
        res = 0;
    }

    if (roundingMode === '') {
        res = num.toFixed(scale);
    } else if (roundingMode === 'ceil') {
        res = Math.ceil(num);
    } else if (roundingMode === 'floor') {
        res = Math.floor(num);
    } else if (roundingMode === 'parseFloat') {
        // 抹零
        res = parseFloat(num.toFixed(scale));
    } else if (roundingMode === 'makeUp') {
        let currentVal = parseFloat(res + '') || 0,
            num = Math.pow(10, scale),
            currentStr = parseFloat(
                ((currentVal * num) / num).toFixed(scale),
            ).toString();

        /**
         * 返回出来的字符串有几种可能
         * 1、整数类型，没有.
         * 2、小数类型，有.
         */
        let formatArr = currentStr.split('.');
        if (typeof formatArr[1] !== 'undefined') {
            // 小数类型
            if (String.prototype.padEnd) {
                // 预防一手不兼容
                formatArr[1] = formatArr[1].padEnd(complement, '0'); // 补足0
            }

            res = formatArr.join('.');
        } else {
            // 整数类型
            formatArr[1] = '';

            if (String.prototype.padEnd) {
                // 预防一手不兼容
                formatArr[1] = formatArr[1].padEnd(complement, '0'); // 补足0
            }

            res = formatArr.join('.');
        }
    }

    return res;
};
// 已迁移到utils/business/pages 目前productDetailv2分包下tools里有重名方法，但实现方式不同，结果是否相同待验证
//针对普通价格
export function dividePrice(price, index) {
    if (price == '***') {
        //兼容没有价格权限的情况
        return index == 0 ? price : '';
    }
    if (price == null) {
        return '';
    }
    let formatPrice = formatDouble(price, 2);
    let point = formatPrice.indexOf('.');
    if (index == 0) {
        return formatPrice.substring(0, point);
    } else {
        return formatPrice.substring(point, formatPrice.length);
    }
};

/**
 * @description translate value to object if value is type of object
 * @param {object|string} value
 * @returns {*}
 */
export function toObject(value) {
    if (isObject(value)) {
        return value;
    }
    return safeJsonParse(value || '{}');
};

export function noop() {}

/**
 * @description read data's key
 * @param {object} obj
 * @param {string} path //eg: a.b.c
 * @returns {any}
 */
export function getter(obj, path) {
    if(obj === undefined){
       return obj;
    }
    const props = path.split(".");
    let result = obj;
    for (const prop of props) {
        const isArrayIndex = /\[\d+\]/.test(prop);
        if (isArrayIndex) {
            const index = parseInt(prop.match(/\d+/)[0]);
            result = result[index];
        } else {
            result = result[prop];
        }
        if (result === undefined) {
            break;
        }
    }
    return result;
}
//setter({}, "a.b.c", 6);
export function setter(obj, key, value) {
    let originObj = obj;
    let keyPath = key.split('.'); //a.b.c = 2
    let abovePart = keyPath.slice(0, keyPath.length - 1);
    let lastPart = keyPath[keyPath.length - 1];
    for (let keyPart of abovePart) {
        let objValue = obj[keyPart];
        if (!isObject(objValue)) {
            obj[keyPart] = {};
        }
        obj = obj[keyPart];
    }
    obj[lastPart] = value;
    return originObj;
}

export function eachObject(obj, callback, prePath = '') {
    callback(prePath, obj);
    if (isObject(obj)) {
        if (isArray(obj)) {
            obj.forEach((item, index) => {
                eachObject(item, callback, `${prePath}[${index}]`);
            });
        } else {
            Object.keys(obj).forEach(key => {
                let value = obj[key];
                eachObject(
                    value,
                    callback,
                    `${prePath ? prePath + '.' : prePath}${key}`,
                );
            });
        }
    }
}

export function getCombinationOfObject(obj, objDef) {
    let pathObj = {};
    /**
     * {
     *     a: [],
     *     b: [],
     *     c: [],
     *     d: []
     * }
     */
    eachObject(objDef, (path, value) => {
        if (isArray(value)) {
            //拿到数组，说明拿到范围值
            pathObj[path] = value;
        }
    });

    let paths = Object.keys(pathObj);
    let arrays = paths.map(path => pathObj[path]);
    let combinations = getCombination(arrays);
    return combinations.map(result => {
        let tmpObj = {};
        paths.forEach((path, index) => {
            let value = result[index];
            let key = path;
            setter(tmpObj, key, value);
        });
        return deepAssign(cloneDeep(obj), tmpObj);
    });
}

/**
 * @description 生成多个数组的组合列表。
 * @param {Array<Array<*>>} arrays - 一个数组的数组，每个数组代表一组可选元素。
 * @returns {Array<Array<*>>} - 返回一个包含所有可能组合的数组。
 * @example
 * <pre>
 *     // 示例用法
 *     let combos = getCombination([
 *         [1, 2],
 *         [3, 4],
 *         [5, 6]
 *     ]);
 *
 *     console.log(combos); // [[1, 3, 5], [1, 3, 6], [1, 4, 5], [1, 4, 6], [2, 3, 5], [2, 3, 6], [2, 4, 5], [2, 4, 6]]
 * </pre>
 */
function getCombination(arrays) {
    let result = [];

    function helper(combination, index) {
        if (index === arrays.length) {
            result.push(combination);
        } else {
            for (let i = 0; i < arrays[index].length; i++) {
                helper([...combination, arrays[index][i]], index + 1);
            }
        }
    }

    helper([], 0);
    return result;
}

/**
 * @description 直接从jQ copy过来的，保留了一部分味道，是故意不小心的
 */
export function parseJSON(data) {
    if (!data || typeof data !== 'string') {
        return null;
    }

    // JSON RegExp
    const rvalidchars = /^[\],:{}\s]*$/;
    const rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
    // eslint-disable-next-line no-useless-escape
    const rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g;
    const rvalidtokens =
        // eslint-disable-next-line no-useless-escape
        /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g;

    // Make sure leading/trailing whitespace is removed (IE can't handle it)
    data = String.trim(data);

    // Attempt to parse using the native JSON parser first
    if (window.JSON && window.JSON.parse) {
        return window.JSON.parse(data);
    }

    // Make sure the incoming data is actual JSON
    // Logic borrowed from http://json.org/json2.js
    if (
        rvalidchars.test(
            data
                .replace(rvalidescape, '@')
                .replace(rvalidtokens, ']')
                .replace(rvalidbraces, ''),
        )
    ) {
        return new Function('return ' + data)();
    }
    console.error('Invalid JSON: ' + data);
}

/**
 * 工具函数
 * Rgb转Hex  将Rgb格式的字符串"rgb(255,255,100)"  转化为 Hex 字符串形式 "#105450"
 */
export function RgbtoHex(rgb) {
    if (/#/g.test(rgb)) return rgb;

    rgb = rgb.replace(/[rgba()]/g, '').split(','); //[r,g,b]

    const hex = ['#'];
    for (let i = 0, hexpart; i < 3; i++) {
        hexpart = parseInt(rgb[i]).toString(16);
        if (hexpart.length === 1) hexpart = '0' + hexpart;
        hex.push(hexpart);
    }
    return hex.join('');
}
