/**
 * @description 深拷贝
 * @param value
 * @return {{}|*}
 */
export function cloneDeep(value) {
    if (typeof value !== 'object' || value === null) {
        return value;
    }

    let clone;
    if (Array.isArray(value)) {
        clone = [];
        for (let i = 0; i < value.length; i++) {
            clone[i] = cloneDeep(value[i]);
        }
    } else {
        clone = {};
        for (let key in value) {
            if (value.hasOwnProperty(key)) {
                clone[key] = cloneDeep(value[key]);
            }
        }
    }

    return clone;
}


/**
 * @description 递归深复制，比较靠谱，不用担心JSON.parse报错
 * @param { any } obj
 * @returns { any }
 */
export function deepAssign() {
    let args = Array.from(arguments);
    return args.reduce(deepClone, args[0]);

    function deepClone(target, obj) {
        if (!target) {
            target = Array.isArray(obj) ? [] : {};
        }

        if (obj && typeof obj === 'object') {
            for (let key in obj) {
                // eslint-disable-next-line no-prototype-builtins
                if (obj.hasOwnProperty(key)) {
                    //判断ojb子元素是否为对象，如果是，递归复制
                    if (obj[key] && typeof obj[key] === 'object') {
                        target[key] = deepClone(target[key], obj[key]);
                    } else {
                        //如果不是，简单复制
                        target[key] = obj[key];
                    }
                }
            }
        }

        return target;
    }
}