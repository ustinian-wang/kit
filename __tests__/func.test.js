import {eachObject, getCombinationOfObject, getter, setter} from "../src/utils/obj.js";

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

test('getCombinationOfObject', () => {
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

    it('should return undefined for null input', () => {
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
