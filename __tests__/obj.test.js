import { getAliasValue, getAliasValue4KeyPath, getAliasValue4NumberCalculate } from "../src/utils/obj.js";
import { testFunctionArgType } from "./utils.js";

test('getAliasValue4KeyPath', () => {
    testFunctionArgType(getAliasValue4KeyPath);
    expect(getAliasValue4KeyPath({ A: 11 }, 'A')).toBe(11);
    expect(getAliasValue4KeyPath({ A: 11 }, 'B')).toBeUndefined();
    expect(getAliasValue4KeyPath({ A: 11 }, 'B', null)).toBeNull();
    expect(getAliasValue4KeyPath({ A: 11 }, 'B.c.d')).toBeUndefined();
    expect(getAliasValue4KeyPath({ B: { c: { d: 1 } } }, 'B.c.d')).toBe(1);
});

test('getAliasValue4NumberCalculate', () => {
    testFunctionArgType(getAliasValue4NumberCalculate);
    expect(getAliasValue4NumberCalculate({ A: 11 }, 'A')).toBe(11);
    expect(getAliasValue4NumberCalculate({ A: 11, B: 11 }, 'A+B')).toBe(22);
    expect(getAliasValue4NumberCalculate({ A: 11, B: null }, 'A+B')).toBe(11);
    expect(getAliasValue4NumberCalculate({ A: 11, B: NaN }, 'A+B')).toBe(11);
});

test('getAliasValue', () => {
    testFunctionArgType(getAliasValue);
    expect(getAliasValue({ A: 11 }, 'A')).toBe(11);
    expect(getAliasValue({ B: 11 }, 'B')).toBe(11);
    expect(getAliasValue({ B: 11 }, 'C')).toBeUndefined();
    expect(getAliasValue({ B: 11 }, 'C', null)).toBeNull();
});
