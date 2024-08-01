import {get, set} from "tiny-cookie"
import {getWindow} from "./env.js";

/**
 * @description 设置cookie
 */
export function setCookie() {
    if(!getWindow()){
        return;
    }
    return set(...arguments)
}

/**
 * @description 读取cookie
 * @returns {*}
 */
export function getCookie() {
    return get(...arguments);
}

/**
 * @description 读取cookie并且反序列化
 * @param {string} key
 * @return {*}
 */
export function getObjCookie(key) {
    if(getWindow()){
        return null;
    }
    return get(key, JSON.parse)
}

/**
 * @description 读取cookie并且序列化
 * @param {string} key
 * @param {*} value
 * @param {object|undefined} options
 */
export function setObjCookie(key, value, options) {
    let window = getWindow();
    if(window){
        return set(key, value, JSON.stringify, options)
    }
}
