import {isArray, isFunction, isObject, isString, isUndefined} from "./typer.js";
import {cloneDeep, deepAssign} from "./clone.js";
import {jsonParse, jsonStringify, safeJsonParse} from "./str.js";
import {noop} from "./other.js";

/**
 * @param value
 * @returns {any}
 */
export const cloneByJSON = (value)=>{
    return jsonParse(jsonStringify(value));
}

/**
 * @description
 * @param {object} obj
 * @param {string} key
 * @param {*} value
 * @returns {*}
 */
export function setter(obj, key='', value) {
    if(!isObject(obj)){
        return;
    }
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

export function eachObject(obj={}, callback=noop, prePath = '') {

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
 * @description translate value to object if value is type of object
 * @param {object|string} value
 * @returns {*}
 */
export function toObject(value) {
    if (isObject(value)) {
        return value;
    }
    return safeJsonParse(value || '{}');
}

/**
 * @description read data's key
 * @param {object} obj
 * @param {string} path //eg: a.b.c
 * @param {any} [defaultValue=undefined]
 * @returns {any}
 */
export function getter(obj, path='', defaultValue = undefined) {
    if (!isObject(obj) || !isString(path)) {
        return defaultValue;
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
            return defaultValue;
        }
    }
    return result;
}