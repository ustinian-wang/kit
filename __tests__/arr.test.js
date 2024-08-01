import {
    array2Map,
    fixArrayIndex,
    getElementsOfCircleArray, getFieldList, getFirstByField, getFirstByFieldEquals,
    insertArrayToCircleArray,
    isNumberArray,
    removeElementsOfArray, sortObjectArray, splitArrayByPredicate, uniqueArray2Map
} from "../src/utils/arr.js";

describe('test', () => {
    test('array2Map', () => {
        expect(array2Map([])).toEqual({});
        expect(array2Map([{}])).toEqual({
            undefined: [{}],
        });
        expect(array2Map([{}], '')).toEqual({
            undefined: [{}],
        });
        expect(array2Map([{}], () => {})).toEqual({
            undefined: [{}],
        });
        expect(array2Map([{ a: 1, b: 2 }])).toEqual({
            undefined: [{ a: 1, b: 2 }],
        });

        let objA = { a: 1, b: 2 };
        let objB = { a: 2, b: 3 };
        let objC = { a: 2, c: 3 };
        expect(array2Map([objA, objB, objC], 'a')).toEqual({
            1: [objA],
            2: [objB, objC],
        });
    });

    test('getFieldList', () => {
        expect(getFieldList([])).toEqual([]);
        expect(getFieldList([], '')).toEqual([]);
        expect(getFieldList([], 'a')).toEqual([]);
        expect(getFieldList([], 'a')).toEqual([]);
        expect(getFieldList([null], 'a')).toEqual([undefined]);
        expect(getFieldList([{ a: 1 }, { a: 2 }, { a: 3 }], 'a')).toEqual([
            1, 2, 3,
        ]);
    });

    test('splitListByCondition', () => {

        expect(splitArrayByPredicate([])).toEqual({
            falseList: [],
            trueList: [],
        });
        expect(splitArrayByPredicate([], () => {})).toEqual({
            falseList: [],
            trueList: [],
        });
        expect(splitArrayByPredicate([], 'a')).toEqual({
            falseList: [],
            trueList: [],
        });
        expect(splitArrayByPredicate([], () => true)).toEqual({
            falseList: [],
            trueList: [],
        });
        expect(
            splitArrayByPredicate(
                [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }],
                object => {
                    return object.a % 2 === 0;
                },
            ),
        ).toEqual({
            falseList: [{ a: 1 }, { a: 3 }],
            trueList: [{ a: 2 }, { a: 4 }],
        });
    });

    test('getFirstByField', () => {
        expect(getFirstByField([])).toEqual(undefined);
        expect(getFirstByField([], '', '')).toEqual(undefined);
        expect(getFirstByField([], 'a', '')).toEqual(undefined);
        expect(getFirstByField([{ a: 1 }, { a: 1, b: 2 }], 'a', 1)).toEqual({
            a: 1,
        });
        expect(getFirstByField([{ a: 1, b: 2 }, { a: 1 }], 'a', 1)).toEqual({
            a: 1,
            b: 2,
        });
    });
});

test('insertArrayToCircleArray', () => {
    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null],
            array: [1],
            circleArrayIndex: 0,
        }),
    ).toEqual([1, null, null]);
    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null],
            array: [1],
            circleArrayIndex: 1,
        }),
    ).toEqual([null, 1, null]);
    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null],
            array: [1],
            circleArrayIndex: 2,
        }),
    ).toEqual([null, null, 1]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2],
            circleArrayIndex: 0,
        }),
    ).toEqual([1, 2, null, null]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2],
            circleArrayIndex: 1,
        }),
    ).toEqual([null, 1, 2, null]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2],
            circleArrayIndex: 2,
        }),
    ).toEqual([null, null, 1, 2]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2],
            circleArrayIndex: 3,
        }),
    ).toEqual([2, null, null, 1]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2],
            circleArrayIndex: 4,
        }),
    ).toEqual([1, 2, null, null]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2],
            circleArrayIndex: -1,
        }),
    ).toEqual([2, null, null, 1]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2],
            circleArrayIndex: -2,
        }),
    ).toEqual([null, null, 1, 2]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2],
            circleArrayIndex: -3,
        }),
    ).toEqual([null, 1, 2, null]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2],
            circleArrayIndex: -4,
        }),
    ).toEqual([1, 2, null, null]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2],
            circleArrayIndex: -5,
        }),
    ).toEqual([2, null, null, 1]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2, 3, 4],
            circleArrayIndex: 0,
        }),
    ).toEqual([1, 2, 3, 4]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2, 3, 4],
            circleArrayIndex: 1,
        }),
    ).toEqual([4, 1, 2, 3]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2, 3, 4],
            circleArrayIndex: 2,
        }),
    ).toEqual([3, 4, 1, 2]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2, 3, 4, 5],
            circleArrayIndex: 0,
        }),
    ).toEqual([1, 2, 3, 4]);

    expect(
        insertArrayToCircleArray({
            circleArray: [null, null, null, null],
            array: [1, 2, 3, 4],
            circleArrayIndex: -1,
        }),
    ).toEqual([2, 3, 4, 1]);

    expect(
        insertArrayToCircleArray({
            circleArray: [11, 22, 33, 44],
            array: [1],
            circleArrayIndex: 0,
        }),
    ).toEqual([1, 22, 33, 44]);

    expect(
        insertArrayToCircleArray({
            circleArray: [11, 22, 33, 44],
            array: [1],
            circleArrayIndex: 1,
        }),
    ).toEqual([11, 1, 33, 44]);

    expect(
        insertArrayToCircleArray({
            circleArray: [11, 22, 33, 44],
            array: [1],
            circleArrayIndex: 2,
        }),
    ).toEqual([11, 22, 1, 44]);

    expect(
        insertArrayToCircleArray({
            circleArray: [11, 22, 33, 44],
            array: [1],
            circleArrayIndex: 3,
        }),
    ).toEqual([11, 22, 33, 1]);

    /*    expect(insertArrayToCircleArray({
            circleArray: [undefined, undefined, undefined, undefined],
            array: [1],
            circleArrayIndex: 0,
        })).toEqual([undefined, undefined, undefined, undefined]);*/

    let circleArray = [{}, {}, {}, {}, {}, {}, {}, {}];
    let array = [1, 2, 3, 4, 5, 6, 7, 7];
    expect(
        insertArrayToCircleArray({
            circleArray,
            array,
            circleArrayIndex: 0,
        }),
    ).toEqual(array);

});

test('getElementsOfCircleArray', () => {
    expect(getElementsOfCircleArray([1, 2, 3, 4], 0, 0)).toEqual([]);
    expect(getElementsOfCircleArray([1, 2, 3, 4], 0, 1)).toEqual([1]);
    expect(getElementsOfCircleArray([1, 2, 3, 4], 0, 2)).toEqual([1, 2]);
    expect(getElementsOfCircleArray([1, 2, 3, 4], 0, 3)).toEqual([1, 2, 3]);
    expect(getElementsOfCircleArray([1, 2, 3, 4], 0, 4)).toEqual([1, 2, 3, 4]);
    expect(getElementsOfCircleArray([1, 2, 3, 4], 0, 5)).toEqual([1, 2, 3, 4]);
    expect(getElementsOfCircleArray([1, 2, 3, 4], 0, 6)).toEqual([1, 2, 3, 4]);

    expect(getElementsOfCircleArray([1, 2, 3, 4, 5, 6], 5, 3)).toEqual([
        6, 1, 2,
    ]);
    expect(getElementsOfCircleArray([1, 2, 3, 4, 5, 6], 0, 0)).toEqual([]);
    expect(getElementsOfCircleArray([1, 2, 3, 4, 5, 6], 0, 1)).toEqual([1]);
    expect(getElementsOfCircleArray([1, 2, 3, 4, 5, 6], 0, 2)).toEqual([1, 2]);
    expect(getElementsOfCircleArray([1, 2, 3, 4, 5, 6], 3, 2)).toEqual([4, 5]);
    expect(getElementsOfCircleArray([1, 2, 3, 4, 5, 6], 3, 3)).toEqual([
        4, 5, 6,
    ]);
    expect(getElementsOfCircleArray([277, 275, 239, 222], -8, 4)).toEqual([
        277, 275, 239, 222,
    ]);

});

test('fixArrayIndex', () => {
    expect(fixArrayIndex([1, 2, 3], 2)).toEqual(2);
    expect(fixArrayIndex([1, 2, 3], 0)).toEqual(0);
    expect(fixArrayIndex([1, 2, 3], -3)).toEqual(-0);
    expect(fixArrayIndex([1, 2, 3], -6)).toEqual(-0);
    expect(fixArrayIndex([1, 2, 3], 5)).toEqual(2);
});

test('isNumberArray', () => {
    expect(isNumberArray([])).toEqual(false);
    expect(isNumberArray([1])).toEqual(true);
    expect(isNumberArray([1, 2])).toEqual(true);
    expect(isNumberArray([1, 2, 3])).toEqual(true);
    expect(isNumberArray([1, 2, 3, 4])).toEqual(true);
    expect(isNumberArray([1, 2, 3, 4, 5])).toEqual(true);
    expect(isNumberArray([1, 2, 3, 4, 5, 6])).toEqual(true);
    expect(isNumberArray([1, 2, 3, 4, 5, 6, 7])).toEqual(true);
});

test('removeElementsOfArray', () => {
    let arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
    let res = removeElementsOfArray(arr, 'a', 2);
    expect(res).toEqual([{ a: 1 }, { a: 3 }]);
});


describe('uniqueArray2Map', () => {
    test('should return an empty object if the input list is empty', () => {
        expect(uniqueArray2Map([])).toEqual({});
    });

    test('should correctly translate the array to a map', () => {
        const list = [{a: 1}, {a: 2}];
        expect(uniqueArray2Map(list, 'a')).toEqual({1: {a: 1}, 2: {a: 2}});
    });

    test('should correctly handle a custom uniqueFieldOrHandler function', () => {
        const list = [{a: 1}, {a: 2}];
        const uniqueFieldOrHandler = (item) => item.a * 2;
        expect(uniqueArray2Map(list, uniqueFieldOrHandler)).toEqual({2: {a: 1}, 4: {a: 2}});
    });
});

describe('getFirstByFieldEquals', () => {


    test('should return the first item that has the specified field equals to the value', () => {
        const list = [{field: 'value1'}, {field: 'value2'}, {field: 'value1'}];
        expect(getFirstByFieldEquals(list, 'field', 'value1')).toEqual({field: 'value1'});
    });

});

describe('sortByFieldAndOrder', () => {
    test('should correctly sort the array in ascnding order', () => {
        const data = [{field: 3}, {field: 1}, {field: 2}];
        expect(sortObjectArray(data, 'field', 'asc')).toEqual([{field: 1}, {field: 2}, {field: 3}]);
    });

    test('should correctly sort the array in descending order', () => {
        const data = [{field: 3}, {field: 1}, {field: 2}];
        expect(sortObjectArray(data, 'field', 'desc')).toEqual([{field: 3}, {field: 2}, {field: 1}]);
    });
});
