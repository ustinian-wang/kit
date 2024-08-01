/**
 * @typedef {Object} ParsedUrl
 * @property {string} search - query string of url
 * @property {string} headOfUrl - The head part of the url like location.origin
 * @property {string} hash - The hash part of the url. eg: #hash
 */
import {getWindow} from "./env.js";
import {getter} from "./obj.js";
import {isString} from "./typer.js";

/**
 * @description parse url as object
 * @param {string} url
 * @return {ParsedUrl}
 */
export function parseUrl(url=""){
    if(!isString(url)){
        return {
            headOfUrl: "",
            search: "",
            hash: ""
        }
    }
    let headOfUrl = url;
    let search = "";
    let hash = "";
    let searchIndex = url.indexOf('?');
    if (searchIndex !== -1) {
        headOfUrl = url.substring(0, searchIndex);
        search = url.substring(searchIndex+1);
    }
    let hashIndex = url.indexOf('#');
    if (hashIndex !== -1) {

        hash = url.substring(hashIndex+1);
        let hashIndexOfSearch = search.indexOf('#');
        if(hashIndexOfSearch !== -1){
            search = search.substring(0, hashIndexOfSearch);
        }else{
            headOfUrl = url.substring(0, hashIndex);
        }
    }

    return {
        headOfUrl,
        search,
        hash
    }
}

/**
 * @description parse options to url
 * @param {ParsedUrl} options
 * @returns {string} full url
 */
export function toUrl(options){
    let {
        headOfUrl,
        search,
        hash
    } = options || {};


    let url = headOfUrl;
    if(search){
        url += '?' + search;
    }
    if(hash){
        url += '#' + hash;
    }
    return url;
}

/**
 * @description get instance of URLSearchParams by parsing url
 * @param {string} url
 * @return {URLSearchParams}
 */
export function getUrlSearchParam(url) {
    let res = parseUrl(url);
    return new URLSearchParams(res.search);
}

/**
 * @description get query value from url by specified key
 * @param {string} url
 * @param {string} key query key
 * @example
 * let url = 'http://www.google.com?a=6';
 * let value = getUrlParam('a');
 * console.log(value);//'6'
 * @return {string} query value
 */
export function getUrlParam(url, key) {
    let searchParams = getUrlSearchParam(url);
    return searchParams.get(key);
}

/**
 * @description get query value from window.location.href
 * @param {string} key
 * @return {string}
 */
export function getCurrUrlParam(key) {
    let url = getCurrentUrl();
    return getUrlParam(url, key);
}

/**
 * @description set query value of url
 * @param {string} url
 * @param {string} key
 * @param {*} value
 * @example
 * let url = 'http://google.com?a=2';
 * url = setUrlParam(url, 'a', '6');
 * console.log(url);//'http://google.com?a=6'
 * @return {string} url with new query value
 */
export function setUrlParam(url, key, value) {
    let res = parseUrl(url);
    let searchParams = new URLSearchParams(res.search);
    searchParams.set(key, value);
    res.search = searchParams.toString();

    return toUrl(res);
}

/**
 * @description get query value of window.location.href
 * @param {string} key
 * @param {string} value
 * @return {string}
 */
export function setCurrUrlParam(key, value) {
    let url = getCurrentUrl();
    return setUrlParam(url, key, value);
}

function getCurrentUrl(){
    let window = getWindow();
    return getter(window, 'location.href');
}

/**
 * @description set random query value to url by specified key
 * @param {string} url
 * @param {string} key
 * @returns {string}
 */
export function setUrlRandomParam(url, key) {
    return setUrlParam(url, key, Math.random());
}

/**
 * @description set some query values to url
 * @param url
 * @param {object} params query string object
 * @example
 * var params = {
 *     a: 11,
 *     b: 22
 * }
 * var url = 'http://google.com?a=1&b=2';
 * url = setQueryParam(url, params);
 * console.log(url); //'http://google.com?a=11&b=22'
 * @return {string}
 */
export function setUrlParams(url, params={}){
    let nowUrl = url
    // let urlObj =
    Object.keys(params).forEach(key=>{
        nowUrl = setUrlParam(nowUrl, key, params[key])
    })
    return nowUrl;
}

/**
 * @description check if the value is url
 * @param {string} value
 * @return {boolean}
 */
export function isUrl(value) {
    try {
        new URL(value);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * @description check if value is a absolute url
 * @param {String} value url
 * @return {Boolean} 是否为绝对路径
 */
export function isAbsoluteUrl(value ) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    if ( typeof value === 'string' ) {
        return /^([a-z][a-z\d+\-.]*:)?\/\//i.test( value )
    } else {
        return false
    }
}