import {isNumber, isString} from "./typer";

/**
 * @description add leading zero if value <10
 * @param {number} value
 * @returns {string}
 */
export function padZero(value) {
    if(!isNumber(value)){
        return "00";
    }
    return value < 10 ? '0' + value : value + '';
}

/**
 * @description value can't includes some values
 * @param {string} value
 * @returns {boolean}
 */
function isNormalStr(value = '') {
    if (value === '') {
        return false;
    }

    let invalidList = [
        void 0,
        new Promise(() => {}),
        () => {},
        function () {},
        null,
        {},
        true,
        false,
    ].map(item => item + '');

    for (let item of invalidList) {
        if (value.includes(item)) {
            return false;
        }
    }

    return true;
}

/**
 * @description check if value is normal event name like 'click.myEvent' with jQuery event name style
 * @param {string} value
 * @returns {boolean}
 */
export function isNormalEventName(value) {
    if (!isString(value)) {
        value = '';
    }
    let valuePair = value.split('.');
    return valuePair.every(item => isNormalStr(item));
}

/**
 * @description a function like css's ellipsis
 * @param {string} text
 * @param {number} maxNum
 * @returns {string}
 */
export function ellipsis(text, maxNum) {
    if (!isString(text)) {
        text = text + '';
    }
    if (!isNumber(maxNum) || isNaN(maxNum)) {
        maxNum = text.length;
    }

    if (text.length > maxNum) {
        return text.substring(0, maxNum) + '...';
    } else {
        return text;
    }
}

/**
 * @description check if the value is json string
 * @param {string} str
 * @returns {boolean}
 */
export function isJSON(str) {
    if (isString(str)) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

/**
 * @description JSON.parse with try catch
 * @param {any} string
 * @param {object|array|undefined} defaultValue
 * @returns {any}
 */
export function safeJsonParse(string, defaultValue = void 0) {
    if (isJSON(string)) {
        return jsonParse(string);
    } else {
        return defaultValue;
    }
}

/**
 * @description JSON.parse with try catch
 * @param {string} string
 * @param {object|array|undefined} defaultValue
 * @returns {any}
 */
export function jsonParse(string = '', defaultValue) {
    try {
        return JSON.parse(string);
    } catch (e) {
        console.error('jsonParse error', e, string);
        console.error(
            '如果要忽略jsonParse的报错，可以调用saveJsonParse，但最好还是查下为什么报错',
        );
        return defaultValue;
    }
}

/**
 * @description JSON.stringify with try catch
 * @param {object|array} object
 * @param {string|undefined} defaultValue
 * @param extArgs
 * @returns {string|*}
 */
export function jsonStringify(object, defaultValue = void 0, extArgs = {}) {
    let { replacer, space } = extArgs;
    try {
        return JSON.stringify(object, replacer, space);
    } catch (e) {
        console.log('jsonStringify error ', e);
        return defaultValue;
    }
}

/**
 * @description compute string length including Chinese and English chars
 * @param {string} str
 * @returns {number}
 */
export function getGbLen(str) {
    if(!isString(str)){
        return 0;
    }
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
}

/**
 * @description slice specified length of string with EN, CN chars
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
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
            count++;
        }
    }
    if (point) {
        return rtStr + '...';
    } else {
        return rtStr;
    }
}