import {isArray, isFunction, isObject} from "./typer";

/**
 *  统一迭代方法，可以迭代对象或者数组
 * @description forEach
 * @param { Object | Array } obj obj
 * @param { Function } fn callback
 * @return { void } 无返回值
 */
export function forEach(obj, fn) {
    // Don't bother if no value provided
    if (!isObject(obj) && !isArray(obj)) {
        return;
    }
    if(!isFunction(fn)){
        return
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
    }

    if (isArray(obj)) {
        // Iterate over array values
        for (let i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        // Iterate over object keys
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}
