/**
 * @param {object} params
 * @return {string}
 */
import {isObject, isString} from "./typer.js";

export const searchParamsToQueryString = (params = {})=>{
    let searchParams = new URLSearchParams(params);
    return searchParams.toString();
}
/**
 * @description get query object from url
 * @param {string} url
 * @returns {object}
 */
export function getQueryObject (url='') {
    if(!isString(url)){
        return {};
    }
    let urlArr = url.split('?'); //先把get参数序反序列化会obj，如果有新增，则增加，反之则覆盖

    let queryString = urlArr[1] || '';
    return queryString2Object(queryString);
};

/**
 * @description translate query string to object
 * @param {string} queryString
 * @returns {object}
 */
export function queryString2Object(queryString) {
    let queryObject = {};
    if (!isString(queryString)) {
        return {};
    }
    if (queryString === '') {
        return {};
    }
    let keyValueArr = queryString.split('&');
    keyValueArr.forEach(kv => {
        let kvArr = kv.split('=');
        let key = kvArr[0] || '';
        queryObject[key] = kvArr.slice(1).join("=") || '';
    });
    return queryObject;
}

/**
 * @description translate object to query string
 * @param {object} queryObject
 * @returns {string}
 */
export function queryObject2String(queryObject) {
    if(!isObject(queryObject)) {
        return "";
    }
    return Object.keys(queryObject)
        .map(key => {
            return key + '=' + queryObject[key];
        })
        .join('&');
}
