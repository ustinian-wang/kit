
import {isNumber, isString, isObject} from "./typer";

/**
 * @description get price of product by alias field
 * @example
 * getAliasValue4Price(product, 'price', -1);
 * getAliasValue4Price(product, 'childInfo.price', -1);
 * @param {object} obj
 * @param {string} alias
 * @param {*} defaultValue
 * @return {*|number}
 */
export function getAliasValue4NumberCalculate(obj, alias, defaultValue) {
    if (!isString(alias)) {
        return 0;
    }
    let isExpress = (alias || '').includes('+');

    if (isExpress) {
        let parts = alias.split('+');

        if (parts.length >= 2) {
            let value = 0;
            parts.forEach(part => {
                let partValue = getAliasValue4KeyPath(obj, part.trim(), 0);
                if (isNumber(partValue) && !isNaN(partValue)) {
                    value += partValue;
                }
            });
            return value;
        }
    }

    return getAliasValue4KeyPath(obj, alias, defaultValue);
}

/**
 * @description get price of product by alias field
 * @example
 *  getAliasValue(product, 'price', -1);
 * @param {object} obj
 * @param {string} alias
 * @param {*} defaultValue
 * @return {*}
 */
export function getAliasValue(obj, alias, defaultValue = undefined) {
    if (!isObject(obj)) {
        return;
    }
    let value = obj[alias];

    if (value !== void 0) {
        return value;
    }

    return defaultValue;
} //支持a.b.c的语法
/**
 * @description get price of product by alias field, and support special grammar such as a.b.c
 * @example
 * getAliasValue4KeyPath({a:{b:{c:3}}}, 'a.b.c', -1);
 * @param {object} obj
 * @param {string} alias
 * @param {*} defaultValue
 * @return {*}
 */
export function getAliasValue4KeyPath(obj, alias, defaultValue) {
    if (!isString(alias)) {
        return;
    }
    let keyPath = (alias || '').split('.');
    let value = defaultValue;

    for (let i = 0; i < keyPath.length; i++) {
        let key = keyPath[i];
        value = getAliasValue(obj, key);
        obj = value;

        if (value === void 0) {
            return defaultValue;
        }
    }

    return value;
} // 通过别名获取价格

export const cloneByJSON = (value)=>{
    return JSON.parse(JSON.stringify(value));
}