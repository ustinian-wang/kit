import {CacheFactory} from "./cache";
import {isFunction} from "./typer.js";

/**
 * @description
 * @param {Function} func - 。
 * @return {Function} return new function caching returned values of calls
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
 * @description delay function call and collect calling parameters util to call at last. like debounce
 * @param {function} func
 * @param {number} [time=300]
 * @return {function}
 */
export function delay(func, time) {
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
 * @description delay function call until last time after specified time
 * @param {function} func function
 * @param {number} [time=300] delay time(ms)
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
 * @description control call time interval of function
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
