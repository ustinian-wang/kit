import {
    padZero,
    ellipsis,
    isJSON,
    isNormalEventName,
    safeJsonParse
} from "../src/utils/str.js";


test('addZero', () => {
    expect(padZero(1)).toBe('01');
    expect(padZero(10)).toBe('10');
    expect(padZero(100)).toBe('100');
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
});

test('isJSON', () => {
    expect(isJSON({ a: 1 })).toBeFalsy();
    expect(isJSON(`{"a":1}`)).toBeTruthy();
    expect(isJSON(``)).toBeFalsy();
    expect(isJSON(`{"a":1`)).toBeFalsy();
    expect(isJSON(`"a":1}`)).toBeFalsy();
    expect(isJSON(`{a:1}`)).toBeFalsy();
});
test('safeJsonParse', () => {
    expect(safeJsonParse({ a: 1 })).toBeUndefined();
    expect(safeJsonParse(`{"a":1}`)).toEqual({ a: 1 });
    expect(safeJsonParse(``)).toBeUndefined();
    expect(safeJsonParse(`{"a":1`)).toBeUndefined();
    expect(safeJsonParse(`"a":1}`)).toBeUndefined();
    expect(safeJsonParse(`{a:1}`)).toBeUndefined();
});
