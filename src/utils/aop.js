import {CacheFactory} from "./cache";
import {isFunction} from "./typer.js";

/**
 * @description 一个强化函数，用于缓存函数的返回值。
 * @param {Function} func - 需要进行记忆的函数。
 * @return {Function} 返回一个新的函数，该函数缓存其参数对应的返回值。
 */
export function memorize(func) {
    let lifeCycle = 60 * 1000; // 默认缓存1分钟

    const cache = CacheFactory({}); // 应该传入配置参数

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.containsKey(key)) {
            return cache.getCache(key);
        }

        const result = func.apply(this, args);
        cache.setCache(key, result);

        return result;
    };
}

/**
 * @description 延迟函数执行，并且缓存延迟期间的参数
 * @param func
 * @param time
 * @return {function}
 */
export function delay(func, time = 0) {
    let timer = null;
    let argumentsList = [];
    return function () {
        argumentsList.push(arguments);
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.call(this, argumentsList.map(args => [...args]));
            argumentsList = [];
        }, time);
    }
}

/**
 * @description 防抖
 * @param {function} func *
 * @param {number} [time=300] ms
 * @return {function}
 */
export function debounce(func, time=300) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if(isFunction(func)){
                func.apply(this, args);
            }
        }, time);
    };
}

/**
 * @description 节流
 * @param {function} func
 * @param {number} [delay=300] ms
 * @return {function}
 */
export function throttle(func, delay = 300) {
    let isThrottled = false;
    return function (...args) {
        if (!isThrottled) {
            func.apply(this, args);
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
            }, delay);
        }
    };
}
