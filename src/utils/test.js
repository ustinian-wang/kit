import {getCombinationOfObject} from "./obj.js";

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
 * @description generate random value by type
 * @param {Function} type like Function, String and so on
 * @returns {*}
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
        return () => {
        };
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
 * @description generate random test cases of function arguments
 * @param {function} func test function with name. like function name(){}
 * @returns {Array<Array<*>>}
 */
export function getArgTestCasesOfFunction(func) {
    let argsLength = func.length;
    let testCase = {};
    let testCaseDef = {};
    for (let i = 0; i < argsLength; i++) {
        let valueList = TypeList.map(genRangeValue);
        testCase[i] = null;
        testCaseDef[i] = valueList;
    }

    let list = getCombinationOfObject(testCase, testCaseDef);

    return list.map(obj => {
        return Object.values(obj)
    })
}