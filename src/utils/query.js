/**
 * @param {object} params
 * @return {string}
 */
import {isString} from "./typer.js";

export const searchParamsToQueryString = (params = {})=>{
    let searchParams = new URLSearchParams(params);
    return searchParams.toString();
}
/**
 * @description get query object from url
 * @param {string} url
 * @returns {object}
 */
export const getQueryObject = url => {
    let urlArr = url.split('?'); //先把get参数序反序列化会obj，如果有新增，则增加，反之则覆盖

    let queryString = urlArr[1] || '';
    return queryString2Object(queryString);
};

/**
 * add query argument of url
 * @param {string} url
 * @param {string} name
 * @param {string} value
 * @returns {string}
 */
export function addPageQuery(url, name, value) {
    if (!isString(url)) {
        url = url + '';
    }
    if (!isString(name)) {
        name = name + '';
    }

    let urlArr = url.split('?'); //先把get参数序反序列化会obj，如果有新增，则增加，反之则覆盖

    let queryString = urlArr[1] || '';
    let queryObject = queryString2Object(queryString);
    queryObject[name] = value;
    queryString = queryObject2String(queryObject);
    return urlArr[0] + '?' + queryString;
}

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
        let val = kvArr[1] || '';
        queryObject[key] = val;
    });
    return queryObject;
}

/**
 * translate object to query string
 * @param {object} queryObject
 * @returns {string}
 */
export function queryObject2String(queryObject) {
    return Object.keys(queryObject)
        .map(key => {
            return key + '=' + queryObject[key];
        })
        .join('&');
}