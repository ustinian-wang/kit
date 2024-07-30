import {
    isArray,
    isBizNull,
    isEmptyArr, isFunction,
    isMatch, isObject,
    isObjectString,
    isPromise,
    isString,
    isStringArray, isUndefined
} from "../src/utils/typer.js";
import { testFunctionArgType } from "./utils.js";

test("isObjectString", ()=>{
    expect(isObjectString("{}")).toBeTruthy()
})

describe('isBizNull', () => {
    it('should return true for null data', () => {
        expect(isBizNull(null)).toBe(true);
    });

    it('should return true for undefined data', () => {
        expect(isBizNull(undefined)).toBe(true);
    });

    it('should return true for empty string data', () => {
        expect(isBizNull('')).toBe(true);
    });

    it('should return false for non-null, non-undefined, and non-empty string data', () => {
        expect(isBizNull('Hello')).toBe(false);
    });

    // 添加更多的测试用例，覆盖其他可能的情况
});

describe('typer.js', () => {
    test('isFunction', () => {
        expect(isFunction(function () {})).toBeTruthy();
        expect(isFunction(() => {})).toBeTruthy();
        expect(isFunction(null)).toBeFalsy();
        expect(isFunction()).toBeFalsy();
        testFunctionArgType(isFunction);
    });

    test('isObject', () => {
        expect(isObject({})).toBeTruthy();
        // expect(isObject([])).toBeTruthy();fixme 这里如果是数组要返回true
        expect(isObject(null)).toBeFalsy();
        expect(isObject()).toBeFalsy();
        testFunctionArgType(isObject);
    });

    test('isUndefined', () => {
        expect(isUndefined(undefined)).toBeTruthy();
        expect(isUndefined('a')).toBeFalsy();
        expect(isUndefined()).toBeTruthy();
        testFunctionArgType(isUndefined);
    });
    test('isArray', () => {
        expect(isArray([])).toBeTruthy();
        expect(isArray({})).toBeFalsy();
        expect(isArray()).toBeFalsy();
        testFunctionArgType(isArray);
    });
    test('isString', () => {
        expect(isString('')).toBeTruthy();
        expect(isString(``)).toBeTruthy();
        expect(isString(String('wgd'))).toBeTruthy();
        expect(isString(null)).toBeFalsy();
        expect(isString()).toBeFalsy();
        testFunctionArgType(isString);
    });
    test('isStringArray', () => {
        expect(isStringArray()).toBeFalsy();
        expect(isStringArray([])).toBeFalsy();
        expect(isStringArray(['', '', ''])).toBeTruthy();
        expect(isStringArray(['a', 'a', 'a'])).toBeTruthy();
        expect(isStringArray(['a', 'a', 'a'])).toBeTruthy();
        expect(isStringArray(['1', 1])).toBeFalsy();
        testFunctionArgType(isStringArray);
    });

    test('isPromise', () => {
        expect(isPromise(new Promise(() => {}))).toBeTruthy();
        expect(isPromise(Promise.resolve())).toBeTruthy();
        expect(isPromise(null)).toBeFalsy();
        expect(isPromise()).toBeFalsy();
        testFunctionArgType(isPromise);
    });

    test('isMatch', () => {
        expect(isMatch({ a: 1 }, { a: 1 })).toBeTruthy();
        expect(isMatch({ a: 1 }, { a: 1 })).toBeTruthy();
        expect(isMatch({ a: 1 }, { a: 2 })).toBeFalsy();
        testFunctionArgType(isMatch);
    });

    test('isEmptyArr', () => {
        expect(isEmptyArr([])).toBeTruthy();
        expect(isEmptyArr({})).toBeFalsy();
        expect(isEmptyArr(null)).toBeFalsy();
        expect(isEmptyArr([null])).toBeFalsy();
        expect(isEmptyArr(undefined)).toBeFalsy();
        testFunctionArgType(isEmptyArr);
    });
});
