import { get, set } from "tiny-cookie"

/**
 * @description 设置cookie
 */
export const setCookie = set

/**
 * @description 读取cookie
 */
export const getCookie = get

/**
 * @description 读取cookie并且反序列化
 * @param key
 * @return {string}
 */
export const getObjCookie = (key) => {
    return get(key, JSON.parse)
};

/**
 * @description 读取cookie并且序列化
 * @param key
 * @param value
 * @param options
 */
export const setObjCookie = (key, value, options) => {
    return set(key, value, JSON.stringify, options)
};
