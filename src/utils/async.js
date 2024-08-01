import {isPromise} from "./typer.js";
import {TimeDef} from "./date.js";

/**
 * @description wait for res if res is instance of Promise
 * @param {*|Promise} res
 * @returns {Promise<*>}
 */
export const awaitPromiseRes = async res => {
    if (isPromise(res)) {
        return await res;
    }
    return res;
};

/**
 * @description promisfy wx api, 保留 success, fail模式, 并返回等价promise
 * @param {Function} api
 * @return {Function}
 */
export function promisify(api) {
    return (options = {}, ...params) => {
        return new Promise((resolve, reject) => {
            api(
                {
                    ...options,
                    success: function (...args) {
                        options.success && options.success(...args);
                        resolve(...args);
                    },
                    fail: function (...args) {
                        options.fail && options.fail(...args);
                        reject(...args);
                    },
                },
                ...params,
            );
        });
    };
}

/**
 * @description sleep for time(ms)
 * @param { number } [time=0]
 * @returns { Promise<any> }
 */
export function sleep(time=0) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

/**
 * @description sleep for seconds
 * @param { number } [second=0]
 * @returns { Promise<any> }
 */
export function sleepSecond(second=0) {
    return sleep(second * TimeDef.SECOND);
}