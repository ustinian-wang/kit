const TypeList = [
    String,
    Number,
    Boolean,
    Function,
    Array,
    Object,
    Date,
    RegExp,
    Error,
    Promise,
];

/**
 * @description get random value
 * @param type
 * @returns {symbol|WeakMap<object, any>|Promise<unknown>|Map<any, any>|Set<any>|undefined|*[]|(function())|*|number|{}|boolean|Error|Date|RegExp|null}
 */
export function genRangeValue(type) {
    if (type === String) {
        let strList =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return strList[Math.floor(Math.random() * strList.length)];
    } else if (type === Number) {
        let numList = '0123456789';
        return numList[Math.floor(Math.random() * numList.length)];
    } else if (type === Boolean) {
        let boolList = [true, false];
        return boolList[Math.floor(Math.random() * boolList.length)];
    } else if (type === Function) {
        return () => {};
    } else if (type === Array) {
        return [];
    } else if (type === Object) {
        return {};
    } else if (type === Date) {
        return new Date();
    } else if (type === RegExp) {
        return new RegExp();
    } else if (type === Error) {
        return new Error();
    } else if (type === Promise) {
        return new Promise(resolve => {
            resolve();
        });
    } else if (type === Symbol) {
        return Symbol();
    } else if (type === Map) {
        return new Map();
    } else if (type === Set) {
        return new Set();
    } else if (type === WeakMap) {
        return new WeakMap();
    } else if (type === null) {
        return null;
    } else if (type === undefined) {
        return undefined;
    } else if (isNaN(type)) {
        return NaN;
    }
}

/**
 * @description each TypeList with callback
 * @param callback
 */
export function eachRandomValues(callback) {
    TypeList.forEach(type => {
        callback(genRangeValue(type));
    });
}

/**
 *
 */
export function testFunctionArgType(func) {
/*    expect(() => {
        let argsLength = func.length;
        for (let i = 0; i < argsLength; i++) {
            eachRandomValues(value => {
                let args = [];
                for (let j = 0; j < i; j++) {
                    args.push(undefined);
                }
                args.push(value);
                func(...args);
            });
        }
    }).not.toThrowError();*/
}
