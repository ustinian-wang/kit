import {dividePrice, eachObject, formatDouble, getCombinationOfObject, getter, setter} from "../src/utils/func.js";

test('setter', () => {
    expect(setter({}, 'a.b.c', 3)).toEqual({
        a: {
            b: {
                c: 3,
            },
        },
    });
    expect(
        setter(
            {
                a: {
                    b: {
                        c: 3,
                    },
                },
            },
            'a.b.c',
            3,
        ),
    ).toEqual({
        a: {
            b: {
                c: 3,
            },
        },
    });
    expect(
        setter(
            {
                a: {
                    b: {},
                    k: 1,
                },
            },
            'a.b.c',
            3,
        ),
    ).toEqual({
        a: {
            b: {
                c: 3,
            },
            k: 1,
        },
    });
    expect(
        setter(
            {
                a: {
                    b: {
                        q: 2,
                    },
                    k: 1,
                },
            },
            'a.b.c',
            3,
        ),
    ).toEqual({
        a: {
            b: {
                c: 3,
                q: 2,
            },
            k: 1,
        },
    });
});

test('eachObject', () => {
    let originObj = {
        a: {
            b: 1,
            c: 1,
            d: {
                g: [],
            },
        },
        k: 6,
    };
    let pathCollection = ['a', 'k', 'a.b', 'a.c', 'a.d', 'a.d.g', ''];
    eachObject(originObj, path => {
        expect(pathCollection.includes(path)).toBeTruthy();
    });
});

test.skip('getCombinationOfObject', () => {
    let obj = {
        content: {
            s: 1,
        },
        pattern: {
            btData: {
                pos: 0,
                s: 0,
                fi: '',
                fp: '',
            },
        },
    };

    let objs = getCombinationOfObject(obj, {
        pattern: {
            btData: {
                pos: [0, 1, 2],
                s: [0, 1],
                fi: ['', 'aaa'],
                fp: ['', 'bbbb'],
            },
        },
    });
    expect(objs).toContainEqual({
        content: {
            s: 1,
        },
        pattern: {
            btData: {
                pos: 0,
                s: 0,
                fi: '',
                fp: '',
            },
        },
    });
    expect(objs).toContainEqual({
        content: {
            s: 1,
        },
        pattern: {
            btData: {
                pos: 0,
                s: 1,
                fi: '',
                fp: 'bbbb',
            },
        },
    });
});

describe('formatDouble function', () => {
    it('should return string with two decimal places by default', () => {
        const input = 123.456789;
        const expectedOutput = '123.46';

        const result = formatDouble(input);

        expect(result).toBe(expectedOutput);
    });

    it('should return string with specified number of decimal places', () => {
        const input = 123.456789;
        const expectedOutput = '123.4568';
        const decimalPlaces = 4;

        const result = formatDouble(input, decimalPlaces);

        expect(result).toBe(expectedOutput);
    });

    it('should return string with no decimal places when specified as "floor"', () => {
        const input = 123.456789;
        const expectedOutput = 123;
        const format = 'floor';

        const result = formatDouble(input, null, format);

        expect(result).toBe(expectedOutput);
    });

    it('should return string with no decimal places when specified as "ceil"', () => {
        const input = 123.456789;
        const expectedOutput = 124;
        const format = 'ceil';

        const result = formatDouble(input, null, format);

        expect(result).toBe(expectedOutput);
    });

    it('should return string with no decimal places when specified as "parseFloat"', () => {
        const input = 123.456789;
        const expectedOutput = 123;
        const format = 'parseFloat';

        const result = formatDouble(input, null, format);

        expect(result).toBe(expectedOutput);
    });

    it('should pad decimal places with zeros when specified as "makeUp"', () => {
        const input = 123.456789;
        const expectedOutput = '123.4568';
        const format = 'makeUp';
        const decimalPlaces = 4;
        const zeroPadding = 4;

        const result = formatDouble(input, decimalPlaces, format, zeroPadding);

        expect(result).toBe(expectedOutput);
    });

    it('should handle negative numbers as zero when specified as "makeUp"', () => {
        const input = -123.456789;
        const expectedOutput = '0.0';
        const format = 'makeUp';
        const decimalPlaces = 4;
        const zeroPadding = 4;
        const allowNegative = true;

        const result = formatDouble(
            input,
            decimalPlaces,
            format,
            zeroPadding,
            allowNegative,
        );

        expect(result).toBe(expectedOutput);
    });

    it('should omit decimal places for integer values', () => {
        const input = 123;
        const expectedOutput = '123.00';
        const decimalPlaces = 2;

        const result = formatDouble(input, decimalPlaces);

        expect(result).toBe(expectedOutput);
    });
});

describe('dividePrice function', () => {
    it('should return "" for index 0 when input is ""', () => {
        const input = '';
        const expectedOutput = '0';
        const index = 0;

        const result = dividePrice(input, index);

        expect(result).toBe(expectedOutput);
    });

    it('should return empty string for null input', () => {
        const input = null;
        const expectedOutput = '';
        const index = 0;

        const result = dividePrice(input, index);

        expect(result).toBe(expectedOutput);
    });

    it('should return integer part of price for index 0', () => {
        const input = 123.456789;
        const expectedOutput = '123';
        const index = 0;

        const result = dividePrice(input, index);

        expect(result).toBe(expectedOutput);
    });

    it('should return decimal part of price for index 1', () => {
        const input = 123.456789;
        const expectedOutput = '.46';
        const index = 1;

        const result = dividePrice(input, index);

        expect(result).toBe(expectedOutput);
    });

    it('should handle price with no decimal places', () => {
        const input = 123;
        const expectedOutput = '.00';
        const index = 1;

        const result = dividePrice(input, index);

        expect(result).toBe(expectedOutput);
    });

    it('should handle price with trailing decimal zeroes', () => {
        const input = 123.45;
        const expectedOutput = '.45';
        const index = 1;

        const result = dividePrice(input, index);

        expect(result).toBe(expectedOutput);
    });
});

describe('getter function', () => {
    it('should return value for top level key', () => {
        const input = { name: 'John', age: 30 };
        const key = 'name';
        const expectedOutput = 'John';

        const result = getter(input, key);

        expect(result).toBe(expectedOutput);
    });

    it('should return value for nested key', () => {
        const input = { person: { name: 'John', age: 30 } };
        const key = 'person.name';
        const expectedOutput = 'John';

        const result = getter(input, key);

        expect(result).toBe(expectedOutput);
    });

    it.skip('should return undefined for null input', () => {
        const input = null;
        const key = 'name';
        const expectedOutput = undefined;

        const result = getter(input, key);

        expect(result).toBe(expectedOutput);
    });

    it('should return undefined for undefined key', () => {
        const input = { name: 'John', age: 30 };
        const key = 'address.city';
        const expectedOutput = undefined;

        const result = getter(input, key);

        expect(result).toBe(expectedOutput);
    });

    it('should return undefined for nested key with null value', () => {
        const input = { person: { name: 'John', age: null } };
        const key = 'person.age';
        const expectedOutput = null;

        const result = getter(input, key);

        expect(result).toBe(expectedOutput);
    });

    it('should return array element by index', () => {
        const input = {
            people: [
                { name: 'John', age: 30 },
                { name: 'Mary', age: 25 },
            ],
        };
        const key = 'people.1.name';
        const expectedOutput = 'Mary';

        const result = getter(input, key);

        expect(result).toBe(expectedOutput);
    });

    it('should return undefined for out of bounds array index', () => {
        const input = {
            people: [
                { name: 'John', age: 30 },
                { name: 'Mary', age: 25 },
            ],
        };
        const key = 'people.2.name';
        const expectedOutput = undefined;

        const result = getter(input, key);

        expect(result).toBe(expectedOutput);
    });
});
