import {
    isArray,
    isEmptyArr, isFunction,
    isMatch, isObject,
    isObjectString,
    isPromise,
    isString,
    isUndefined
} from "../src/utils/typer.js";
import {isStringArray} from "../src/utils/arr.js";

test("isObjectString", ()=>{
    expect(isObjectString("{}")).toBeTruthy()
})


describe('typer.js', () => {
    test('isFunction', () => {
        expect(isFunction(function () {})).toBeTruthy();
        expect(isFunction(() => {})).toBeTruthy();
        expect(isFunction(null)).toBeFalsy();
        expect(isFunction()).toBeFalsy();
    });

    test('isObject', () => {
        expect(isObject({})).toBeTruthy();
        // expect(isObject([])).toBeTruthy();fixme 这里如果是数组要返回true
        expect(isObject(null)).toBeFalsy();
        expect(isObject()).toBeFalsy();
    });

    test('isUndefined', () => {
        expect(isUndefined(undefined)).toBeTruthy();
        expect(isUndefined('a')).toBeFalsy();
        expect(isUndefined()).toBeTruthy();
    });
    test('isArray', () => {
        expect(isArray([])).toBeTruthy();
        expect(isArray({})).toBeFalsy();
        expect(isArray()).toBeFalsy();
    });
    test('isString', () => {
        expect(isString('')).toBeTruthy();
        expect(isString(``)).toBeTruthy();
        expect(isString(String('wgd'))).toBeTruthy();
        expect(isString(null)).toBeFalsy();
        expect(isString()).toBeFalsy();
    });
    test('isStringArray', () => {
        expect(isStringArray()).toBeFalsy();
        expect(isStringArray([])).toBeFalsy();
        expect(isStringArray(['', '', ''])).toBeTruthy();
        expect(isStringArray(['a', 'a', 'a'])).toBeTruthy();
        expect(isStringArray(['a', 'a', 'a'])).toBeTruthy();
        expect(isStringArray(['1', 1])).toBeFalsy();
    });

    test('isPromise', () => {
        expect(isPromise(new Promise(() => {}))).toBeTruthy();
        expect(isPromise(Promise.resolve())).toBeTruthy();
        expect(isPromise(null)).toBeFalsy();
        expect(isPromise()).toBeFalsy();
    });

    test('isMatch', () => {
        expect(isMatch({ a: 1 }, { a: 1 })).toBeTruthy();
        expect(isMatch({ a: 1 }, { a: 1 })).toBeTruthy();
        expect(isMatch({ a: 1 }, { a: 2 })).toBeFalsy();
    });

    test('isEmptyArr', () => {
        expect(isEmptyArr([])).toBeTruthy();
        expect(isEmptyArr({})).toBeFalsy();
        expect(isEmptyArr(null)).toBeFalsy();
        expect(isEmptyArr([null])).toBeFalsy();
        expect(isEmptyArr(undefined)).toBeFalsy();
    });
});
