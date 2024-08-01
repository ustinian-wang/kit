import {equals, isArray, isFunction, isNumber, isObject, isString} from "./typer";
import {cloneDeep,} from "./clone";
import {noop} from "./other.js";

/**
 * @description group map by field or handler to map object
 * @param {array<*>} list
 * @param {string | function} fieldOrHandler
 * @returns {object}
 */
export function array2Map(list = [], fieldOrHandler = '') {
    let obj = {};
    if (!isArray(list)) {
        list = [];
    }
    list.forEach(function(item) {
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
 * @description collecting some field of item to generate list;
 * @param {array} itemList target list
 * @param {string} field
 * @returns {Array}
 */
export function getFieldList(itemList = [], field = '') {
    if (!isArray(itemList)) {
        itemList = [];
    }

    return itemList.map(function(item) {
        if (isObject(item) || isArray(item)) {
            return item[field];
        } else {
            return undefined;
        }
    });
}

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
export function splitArrayByPredicate(list, predicate = noop) {
    let trueList = [];
    let falseList = [];
    if (!isArray(list)) {
        list = [];
    }
    list.forEach(function(item) {
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
}
/**
 * @description get first item when field is equals with others in memory reference
 * @param {Array<object>} list
 * @param {string} field
 * @param {any} value
 * @returns {object|null}
 */
export function getFirstByField(list, field, value) {
    if (!isArray(list)) {
        list = [];
    }
    if (!isString(field)) {
        field = '';
    }
    return list.find(function(item) {
        return item[field] === value;
    });
}

/**
 * @description insert elements to circle array
 * @param {Object} options
 * @param {Array<any>} options.circleArray the last is previous of the first in logic
 * @param {Array<any>} options.array
 * @param {number} [options.circleArrayIndex=0]
 * @param {Function} options.match
 * @returns {Array<any>}
 */
export function insertArrayToCircleArray(options = {}) {
    if(!isObject(options)) {
        options = {};
    }
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

    array.forEach(function(item) {
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
export function fixArrayIndex(array, index) {
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
}

/**
 * @description is number array
 * @param {Array<any>} array
 * @returns {*}
 */
export function isNumberArray(array) {
    return isTypeArray(array, isNumber);
}

export function isArrayWithElements(array){
    return isArray(array) && array.length>0;
}

/**
 * @description is array with elements that match typeExpect
 * @param {array} value
 * @param {function} typeExpect
 * @returns {*}
 */
export function isTypeArray(value, typeExpect=noop) {
    return isArrayWithElements(value) && value.every( typeExpect);
}

/**
 * @description remove specified element from array
 * @param {array<object>} array
 * @param {string} field
 * @param {*} value
 * @return {array<object>}
 */
export function removeElementsOfArray(array, field, value) {
    if(!isArrayWithElements(array) || !isString(field)) {
        return array;
    }
    let index = array.findIndex(function(item) {
        return item[field] === value;
    });
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}



/**
 * @description translate object to map struct eg: [{a:1},{a:2}] => {1:{a:1}, 2:{a:2}}
 * @param {Array} list
 * @param {string|function} uniqueFieldOrHandler
 * @returns {{}}
 */
export function uniqueArray2Map(list = [], uniqueFieldOrHandler = '') {
    let arrayMap = array2Map(list, uniqueFieldOrHandler);
    let finalMap = {};
    Object.keys(arrayMap).forEach(function(key) {
        finalMap[key] = arrayMap[key][0];
    });
    return finalMap;
}

/**
 * @description get first item when field is equals with others
 * @param {Array<object>} list
 * @param {string} [field='']
 * @param {*} value
 * @returns {object|undefined}
 */
export function getFirstByFieldEquals(list=[], field='', value) {
    return list.find(function(item) {
        return equals(item[field], value);
    });
}


/**
 * @description sort array by field
 * @param {Array<object>} data
 * @param {string} field
 * @param {string} order desc, asc. default is desc
 * @return {*}
 */
export function sortObjectArray(data, field, order='desc') {
    if(!isTypeArray(data, isObject) || !isString(field)) {
        return;
    }
    // 比较函数根据指定字段和排序方式定义排序规则
    function compare(a, b) {
        if (order === 'asc') {
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

/**
 * @description check if value is array with string type
 * @param {*} value
 * @returns {boolean}
 */
export function isStringArray(value) {
    return isTypeArray(value, isString);
}