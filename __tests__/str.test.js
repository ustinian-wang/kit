import {testFunctionArgType} from "./utils.js";
import {
    addZero,
    ellipsis,
    isJSON,
    isNormalEventName,
    objectToHttpString, objectToQueryString,
    round10000Int2Str,
    safeJsonParse
} from "../src/utils/str.js";

test('objectToQueryString', () => {
    let str = objectToQueryString({
        a: 1,
        b: 2,
    });

    expect(str).toBe('a=1&b=2');
    testFunctionArgType(objectToQueryString);
});

test('addZero', () => {
    expect(addZero(1)).toBe('01');
    expect(addZero(10)).toBe('10');
    expect(addZero(100)).toBe('100');
    testFunctionArgType(addZero);
});

test('isNormalEventName', () => {
    let str, res;

    str = 'click';
    res = isNormalEventName(str);
    expect(res).toBeTruthy();

    str = 'click.wgd';
    res = isNormalEventName(str);
    expect(res).toBeTruthy();

    str = `click.${null}`;
    res = isNormalEventName(str);
    expect(res).toBeFalsy();

    str = `click.${undefined}`;
    res = isNormalEventName(str);
    expect(res).toBeFalsy();

    str = `click.${''}`;
    res = isNormalEventName(str);
    expect(res).toBeFalsy();

    str = `click.${true}`;
    res = isNormalEventName(str);
    expect(res).toBeFalsy();

    str = `click.${false}`;
    res = isNormalEventName(str);
    expect(res).toBeFalsy();

    str = `REFRESH_MODULE.tabBar`;
    res = isNormalEventName(str);
    expect(res).toBeTruthy();

    str = `showGiftPanel`;
    res = isNormalEventName(str);
    expect(res).toBeTruthy();
    testFunctionArgType(isNormalEventName);
});

test('ellipsis', () => {
    expect(
        ellipsis('1234567890123456789012345678901234567890123456789012345', 3),
    ).toEqual('123...');
    expect(ellipsis('123', 4)).toEqual('123');
    expect(ellipsis('123', 3)).toEqual('123');
    expect(ellipsis('123', 2)).toEqual('12...');
    expect(ellipsis('123', 1)).toEqual('1...');
    expect(ellipsis('123', 0)).toEqual('...');
    testFunctionArgType(ellipsis);
});

test('isJSON', () => {
    expect(isJSON({ a: 1 })).toBeFalsy();
    expect(isJSON(`{"a":1}`)).toBeTruthy();
    expect(isJSON(``)).toBeFalsy();
    expect(isJSON(`{"a":1`)).toBeFalsy();
    expect(isJSON(`"a":1}`)).toBeFalsy();
    expect(isJSON(`{a:1}`)).toBeFalsy();
    testFunctionArgType(isJSON);
});
test('safeJsonParse', () => {
    expect(safeJsonParse({ a: 1 })).toBeUndefined();
    expect(safeJsonParse(`{"a":1}`)).toEqual({ a: 1 });
    expect(safeJsonParse(``)).toBeUndefined();
    expect(safeJsonParse(`{"a":1`)).toBeUndefined();
    expect(safeJsonParse(`"a":1}`)).toBeUndefined();
    expect(safeJsonParse(`{a:1}`)).toBeUndefined();
    testFunctionArgType(safeJsonParse);
});
test('objectToHttpString', () => {
    expect(objectToHttpString({ a: 1 })).toEqual('{"a":1}');
    expect(objectToHttpString('{a:1,b:2}')).toEqual('{a:1,b:2}');
    testFunctionArgType(objectToHttpString);
});

test('round10000Int2Str', () => {
    expect(round10000Int2Str(10000000)).toBe('1000万');
    expect(round10000Int2Str(0)).toBe('0');
    expect(round10000Int2Str(10)).toBe('10');
    expect(round10000Int2Str(100)).toBe('100');
    expect(round10000Int2Str(1000)).toBe('1000');
    expect(round10000Int2Str(10000)).toBe('1万');
    expect(round10000Int2Str(15000)).toBe('1.5万');
    expect(round10000Int2Str(15500)).toBe('1.55万');
    expect(round10000Int2Str(15550)).toBe('1.56万');
    expect(round10000Int2Str(15540)).toBe('1.55万');
    testFunctionArgType(round10000Int2Str);
});
