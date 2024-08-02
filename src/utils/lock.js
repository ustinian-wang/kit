import {awaitPromiseRes} from "./async.js";
import {noop} from "./other.js";

/**
 * @description lock user actions until it finished
 * @example
 * //创建
 * import { getTriggerLock } from '@/utils/lock.js';
 * let locker = getTriggerLock();
 * export default {
 *      onLoad(){
 *          locker.release();
 *      },
 *      methods:{
 *          onClickToProductDetail(){
 *            locker.trigger(async () => {
 *              let res1 = await getDataByAjax();
 *              let res2 = await setCartItem();
 *              let id = res2.data.data.id;
 *              uni.navigateTo({
 *                url: "/pages/somePage?id="+id
 *              })
 *            });
 *          }
 *      }
 *  });
 *
 */
export class TriggerLock {
    constructor() {
        this.locking = false;
    }
    async trigger(handler) {
        if (this.locking) {
            return;
        }

        this.locking = true;
        let res = null;

        try {
            this.locking = true;

            try {
                res = handler(); //如果返回的是一个promise，那么自动在最后进行解锁
                if (res instanceof Promise) {
                    await res;
                }
            } finally {
                this.locking = false;
            }
        } catch (e) {
            console.error('trigger err', e);
            this.release();
        }
    }
    release() {
        this.locking = false;
    }

    isLocking() {
        return this.locking;
    }

    static getInstance() {
        return new TriggerLock();
    }

    wrap(func) {
        return LockerWrapper(this, func);
    }
}

/**
 * @description get lockFactory instance of click action
 * @returns {TriggerLock}
 */
export function getTriggerLock(){
    return TriggerLock.getInstance(...arguments);
}

/**
 * @description create function with locker
 * @param {TriggerLock} locker a instance of TriggerLocker
 * @param {function} func you would like to control the function through locker, the default value is empty function, just like noop
 * @returns {function}
 */
export function LockerWrapper (locker, func = noop) {
    if (!locker) {
        console.log('please pass locker');
        return func;
    }

    if (!(locker instanceof TriggerLock)) {
        console.error('please pass instance of TriggerLock');
        return func;
    }

    return async function (...args) {
        return await locker.trigger(async () => {
            let res = func.apply(this, args);
            return await awaitPromiseRes(res);
        });
    };
}
