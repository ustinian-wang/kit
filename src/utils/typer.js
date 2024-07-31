import {isEmptyObj} from "./func";

/**
 * @description whether value is array with numeric type
 * @param value
 * @returns {boolean}
 */
export function isStringArray(value) {
    return isArray(value) && value.length > 0 && value.every(isString);
}

/**
 * @description whether value is Promise type
 * @param value
 * @returns {boolean}
 */
export function isPromise(value) {
    return value instanceof Promise;
}
/**
 * dead simple _.isMatch implementation. https://lodash.com/docs/4.17.15#isMatch
 * Performs a partial deep comparison between object and source to determine if object contains equivalent property values.
 *
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
 * Determine whether it is an empty array
 * @param value it must be an array value
 * @returns {boolean}
 */
export function isEmptyArr(value) {
    return isArray(value) && value.length === 0;
};

/**
 * @description Determine whether it is an empty object
 * @param obj
 * @return {boolean}
 */
export function isEmptyObject(obj) {
    let name;
    for (name in obj) {
        return false;
    }
    return true;
};

/**
 * @description Determine whether it is an empty object
 * @param value
 * @return {boolean}
 */
export function isArray(value) {
    return Array.isArray(value);
}

/**
 * @description Determine whether it is an object
 * @param value
 * @return {boolean}
 */
export function isObject(value) {
    return typeof value === 'object' && value !== null && !isArray(value);
}

/**
 * @description Determine whether it is a function
 * @param value
 * @return {boolean}
 */
export function isFunction(value) {
    return typeof value === 'function';
}

/**
 * @description Determine whether it is a number
 * @param value
 * @return {boolean}
 */
export function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

/**
 * @description Determine whether it is a boolean
 * @param value
 * @return {boolean}
 */
export function isBoolean(value) {
    return typeof value === 'boolean';
}

/**
 * @description Determine whether it is null
 * @param value
 * @return {boolean}
 */
export function isNull(value) {
    return value === null;
}

/**
 * @description 该方法会在首参为false，null，undefined，或空对象时返回true
 *
 * @deprecated 由于函数名不明确，函数定位模糊被废弃，请使用utils/tools/typer代替
 * @param {any} data
 * @returns {Boolean}
 */
export function isBizNull(data) {
    if (data == null || typeof data == 'undefined' || data === '') {
        return true;
    }
    return isEmptyObj(data);
}

/**
 * @description Determine whether it is undefined
 * @param value
 * @return {boolean}
 */
export function isUndefined(value) {
    return typeof value === 'undefined';
}

/**
 * @description Determine whether it is a instance of Date
 * @param value
 * @return {boolean}
 */
export function isDate(value) {
    return value instanceof Date;
}

/**
 * @description Determine whether it is a instance of RegExp
 * @param value
 * @return {boolean}
 */
export function isRegExp(value) {
    return value instanceof RegExp;
}

/**
 * @description Determine whether it is a instance of Error
 * @param value
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
 * @description Determine whether it is a falsy value
 * @param value
 * @return {boolean}
 */
export function isFalsy(value) {
    return !value;
}

/**
 * @description Determine whether it is a string value
 * @param value
 * @return {boolean}
 */
export function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

// 该方法只能检查一个字符串是否看起来像是一个对象字符串，并不能确定该字符串是否可以正确解析为一个有效的 JSON 对象。
// 如果需要对一个字符串进行完整的 JSON 格式验证，可以使用 JSON.parse() 方法并捕获异常来判断。
export function isObjectString(str) {
    // 首先，使用 typeof 判断字符串的类型是否为字符串
    if (typeof str !== 'string') {
        return false;
    }

    // 然后，判断字符串是否以 '{' 开始且以 '}' 结束
    return str.trim().charAt(0) === '{' &&
        str.trim().charAt(str.length - 1) === '}';

}
