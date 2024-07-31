import {get, set} from "tiny-cookie"

/**
 * @description 设置cookie
 */
export function setCookie() {
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
    return get(key, JSON.parse)
}

/**
 * @description 读取cookie并且序列化
 * @param {string} key
 * @param {*} value
 * @param {object|undefined} options
 */
export function setObjCookie(key, value, options) {
    return set(key, value, JSON.stringify, options)
}
