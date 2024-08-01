import {safeJsonParse} from "./str.js";

/**
 * @description whether value is Promise type
 * @param {*} value
 * @returns {boolean}
 */
export function isPromise(value) {
    return value instanceof Promise;
}
/**
 * @description dead simple _.isMatch implementation. https://lodash.com/docs/4.17.15#isMatch
 * Performs a partial deep comparison between object and source to determine if object contains equivalent property values.
 * @param {Object} object
 * @param {Object} source
 * @returns {boolean}
 */
export function isMatch(object, source) {
    if (!isObject(object) || !isObject(source)) {
        return false;
    }
    let match = true;

    for (const property in source) {
        if (isObject(source[property])) {
            match = isMatch(object[property], source[property]);
        } else if (isArray(source[property])) {
            match = source[property].every((_, index) =>
                isMatch(object[property][index], source[property][index]),
            );
        } else {
            match = object[property] === source[property];
        }

        if (!match) {
            break;
        }
    }

    return match;
}

/**
 * @description check if it is an empty array
 * @param {*} value it must be an array value
 * @returns {boolean}
 */
export function isEmptyArr(value) {
    return isArray(value) && value.length === 0;
}

/**
 * @description check if it is an empty object
 * @param {*} value
 * @return {boolean}
 */
export function isArray(value) {
    return Array.isArray(value);
}

/**
 * @description check if it is an object
 * @param {*} value
 * @return {boolean}
 */
export function isObject(value) {
    return typeof value === 'object' && value !== null && !isArray(value);
}

/**
 * @description check if it is a function
 * @param {*} value
 * @return {boolean}
 */
export function isFunction(value) {
    return typeof value === 'function';
}

/**
 * @description check if it is a number
 * @param {*} value
 * @return {boolean}
 */
export function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

/**
 * @description check if it is a boolean
 * @param {*} value
 * @return {boolean}
 */
export function isBoolean(value) {
    return typeof value === 'boolean';
}

/**
 * @description check if it is null
 * @param {*} value
 * @return {boolean}
 */
export function isNull(value) {
    return value === null;
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
 * @description check if it is undefined
 * @param {*} value
 * @return {boolean}
 */
export function isUndefined(value) {
    return typeof value === 'undefined';
}

/**
 * @description check if it is a instance of Date
 * @param {*} value
 * @return {boolean}
 */
export function isDate(value) {
    return value instanceof Date;
}

/**
 * @description check if it is a instance of RegExp
 * @param {*} value
 * @return {boolean}
 */
export function isRegExp(value) {
    return value instanceof RegExp;
}

/**
 * @description check if it is a instance of Error
 * @param {*} value
 * @return {boolean}
 */
export function isEmpty(value) {
    if (isArray(value) || isString(value)) {
        return value.length === 0;
    } else if (isObject(value)) {
        return Object.keys(value).length === 0;
    }
    return false;
}

/**
 * @description check if it is a falsy value
 * @param {*} value
 * @return {boolean}
 */
export function isFalsy(value) {
    return !value;
}

/**
 * @description check if it is a string value
 * @param {*} value
 * @return {boolean}
 */
export function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

/**
 * @description check if value is json with object
 * @param {string} value
 * @returns {boolean}
 */
export function isObjectString(value) {
    if (!isString(value)) {
        return false;
    }

    return isObject(safeJsonParse(value));
}

/**
 * @description check if value is class
 * @param {*} value
 * @returns {string|boolean}
 */
export function isClass(value){
    let errorMessage = `Class constructor A cannot be invoked without 'new'`;
    try{
        value();
    }catch(e){
        return e.message = errorMessage
    }
    return false;
}