import {isPromise} from "./typer.js";

/**
 * @description wait for res if res is instance of Promise
 * @param res
 * @returns {Promise<*|*>}
 */
export const awaitPromiseRes = async res => {
    if (isPromise(res)) {
        return await res;
    }
    return res;
};
