import { isJSON } from "./str";

/**
 * @description JSON.parse with try catch
 * @param {any} string
 * @param {object|array|undefined} defaultValue
 * @returns {any}
 */
export function safeJsonParse(string, defaultValue = void 0) {
    if (isJSON(string)) {
        return jsonParse(string);
    } else {
        return defaultValue;
    }
}

/**
 * @description JSON.parse with try catch
 * @param {string} string
 * @param {object|array|undefined} defaultValue
 * @returns {any}
 */
export function jsonParse(string = '', defaultValue) {
    try {
        return JSON.parse(string);
    } catch (e) {
        console.error('jsonParse error', e, string);
        console.error(
            '如果要忽略jsonParse的报错，可以调用saveJsonParse，但最好还是查下为什么报错',
        );
        return defaultValue;
    }
}

/**
 * @description JSON.stringify with try catch
 * @param {object|array} object
 * @param {string|undefined} defaultValue
 * @param extArgs
 * @returns {string|*}
 */
export function jsonStringify(object, defaultValue = void 0, extArgs = {}) {
    let { replacer, space } = extArgs;
    try {
        return JSON.stringify(object, replacer, space);
    } catch (e) {
        console.error('jsonStringify error ', e);
        return defaultValue;
    }
}
