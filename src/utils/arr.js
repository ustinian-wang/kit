import {equals, noop} from "./func.js";
import { isFunction, isArray, isNumber, isString, isObject } from "./typer";
import { cloneDeep,  } from "./clone";

/**
 * @description translate array to map struct
 * @param {array} list
 * @param {string | function} fieldOrHandler
 * @returns {object}
 */
export function array2Map(list = [], fieldOrHandler = '') {
    let obj = {};
    if (!isArray(list)) {
        list = [];
    }
    list.forEach(item => {
        let value;
        if (isFunction(fieldOrHandler)) {
            value = fieldOrHandler(item);
        } else {
            value = item[fieldOrHandler];
        }
        if (!obj[value]) {
            obj[value] = [];
        }
        obj[value].push(item);
    });

    return obj;
}

/**
 * @description translate object to map struct eg: [{a:1},{a:2}] => {1:{a:1}, 2:{a:2}}
 * @param {Array} list
 * @param {string|function} uniqueFieldOrHandler
 * @returns {{}}
 */
export const uniqueArray2Map = (list = [], uniqueFieldOrHandler = '') => {
    let arrayMap = array2Map(list, uniqueFieldOrHandler);
    let finalMap = {};
    Object.keys(arrayMap).forEach(key => {
        finalMap[key] = arrayMap[key][0];
    });
    return finalMap;
};

/**
 * collecting some field of item to generate list;
 * @param {array} itemList target list
 * @param {string} field
 * @returns {Array}
 */
export const getFieldList = (itemList = [], field = '') => {
    if (!isArray(itemList)) {
        itemList = [];
    }

    return itemList.map(item => {
        if (isObject(item) || isArray(item)) {
            return item[field];
        } else {
            return undefined;
        }
    });
};

/**
 * @typedef {object} SplitListByConditionResult
 * @property {array} trueList
 * @property {array} falseList
 */
/**
 * separating list to true list and false list
 * @param {array} list
 * @param {function} [predicate=noop]
 * @returns {SplitListByConditionResult}
 */
export const splitListByCondition = (list, predicate = noop) => {
    let trueList = [];
    let falseList = [];
    if (!isArray(list)) {
        list = [];
    }
    list.forEach(item => {
        if (isFunction(predicate) && predicate(item)) {
            trueList.push(item);
        } else {
            falseList.push(item);
        }
    });

    return {
        trueList,
        falseList,
    };
};
/**
 * @description get first item when field is equals with others in memory reference
 * @param {Array<object>} list
 * @param {string} field
 * @param {any} value
 * @returns {object|null}
 */
export const getFirstByField = (list, field, value) => {
    if (!isArray(list)) {
        list = [];
    }
    if (!isString(field)) {
        field = '';
    }
    return list.find(item => item[field] === value);
};

/**
 * @deprecated get first item when field is equals with others
 * @param {Array<object>} list
 * @param {string} field
 * @param {any} value
 * @returns {object|null}
 */
export const getFirstByFieldEquals = (list, field, value) => {
    return list.find(item => equals(item[field], value));
};

/**
 * @description circleArray是普通数组，但是认为最后一位和前一位连为循环数组，然后在circleArrayIndex位置插入array，作为circleArray的元素，若circleArray和array的元素通过match函数进行匹配，则不进行替换，反之替换
 * @param {Object} options
 * @param {Array<any>} options.circleArray
 * @param {Array<any>} options.array
 * @param {number} [options.circleArrayIndex=0]
 * @param {Function} options.match
 * @returns {Array<any>}
 */
export function insertArrayToCircleArray(options) {
    let {
        circleArray = [],
        array = [],
        circleArrayIndex = 0,
        match = equals,
    } = options;
    circleArray = cloneDeep(circleArray);
    array = cloneDeep(array);

    array = array.slice(0, circleArray.length);

    let isZero = circleArrayIndex === 0;
    if (isZero) {
        circleArrayIndex = circleArrayIndex + 1;
    }
    circleArrayIndex = circleArrayIndex % circleArray.length;
    if (isZero) {
        circleArrayIndex = circleArrayIndex - 1;
    }

    array.forEach(item => {
        circleArrayIndex = fixArrayIndex(circleArray, circleArrayIndex);

        let originItem = circleArray[circleArrayIndex];
        if (!match(item, originItem)) {
            circleArray[circleArrayIndex] = item;
        }
        circleArrayIndex++;
    });

    return circleArray;
}

/**
 * @description get elements of circleArray
 * @param {array} circleArray
 * @param {number} index
 * @param {number} length
 * @returns {Array<any>}
 */
export function getElementsOfCircleArray(
    circleArray = [],
    index = 0,
    length = 0,
) {
    length = length > circleArray.length ? circleArray.length : length;
    index = fixArrayIndex(circleArray, index);

    let newArray = [];
    for (let i = 0; i < length; i++) {
        newArray.push(circleArray[index]);
        index = index + 1;
        if (index > circleArray.length - 1) {
            index = 0;
        }
    }

    return newArray;
}

/**
 * @description fix index of array
 * @param {array} array
 * @param {number} index
 * @returns {*}
 */
export const fixArrayIndex = (array, index) => {
    if (!isArray(array)) {
        array = [];
    }
    if (!isNumber(index)) {
        index = 0;
    }
    if (array.length === 0) {
        return 0;
    }
    index = index % array.length;
    if (index < 0) {
        index = index + array.length;
    }
    if (index > array.length - 1) {
        index = index - array.length;
    }
    return index;
};

/**
 * @description is number array
 * @param {Array<any>} array
 * @returns {*}
 */
export const isNumberArray = array => {
    return (
        isArray(array) &&
        array.length > 0 &&
        array.every(item => isNumber(item))
    );
};
/**
 * @description 从数组里面删除某个元素
 * @param array
 * @param field
 * @param value
 * @return {*}
 */
export const removeElementsOfArray = (array, field, value) => {
    let index = array.findIndex(item => item[field] === value);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
};

/**
 * @description 格局数组的某个字段进行排序
 * @param data
 * @param field
 * @param order
 * @return {*}
 */
export function sortByFieldAndOrder(data, field, order) {
    // 比较函数根据指定字段和排序方式定义排序规则
    function compare(a, b) {
        if (order === 'asce') {
            if (a[field] < b[field]) {
                return -1;
            } else if (a[field] > b[field]) {
                return 1;
            }
        } else if (order === 'desc') {
            if (a[field] > b[field]) {
                return -1;
            } else if (a[field] < b[field]) {
                return 1;
            }
        }
        return 0;
    }

    // 使用比较函数进行排序
    data.sort(compare);

    return data;
}
