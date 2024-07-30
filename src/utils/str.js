import {isNumber, isString} from "./typer";

/**
 * translate '1' into '01'
 * @param {number} i
 * @returns {string}
 */
export function addZero(i) {
    return i < 10 ? '0' + i : i + '';
}

/**
 * value can't includes some values
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
 * value is normal event name
 * @param value
 * @returns {*}
 */
export function isNormalEventName(value) {
    if (!isString(value)) {
        value = '';
    }
    let valuePair = value.split('.');
    return valuePair.every(item => isNormalStr(item));
}

/**
 * a function like css's ellipsis
 * @param {string} text
 * @param {number} maxNum
 * @returns {string|*}
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
 * determine if the value is json
 * @param str
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
 * translate value to string when value is object type
 * @param {any} value
 * @returns {string}
 */
export function objectToHttpString(value) {
    if (isString(value)) {
        return value;
    }
    return jsonStringify(value);
}

/**
 * @description convert object to query string
 * @param {object} object { a: 1, b: 2}
 * @returns {string} a=1&b=2
 */
export const objectToQueryString = object => {
    return Object.keys(object)
        .map(key => {
            return `${key}=${object[key]}`;
        })
        .join('&');
};

/**
 * @description get simple performance of big number
 * @param {number} value
 * @return {string}
 */
export function round10000Int2Str(value) {
    if (value < 10000) {
        return value + '';
    } else {
        return Math.round((value / 10000) * 100) / 100 + '万';
    }
}
