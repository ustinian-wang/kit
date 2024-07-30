// import { testFunctionArgType } from '../utils.js';
// import { TriggerLock } from '@/utils/lock.js';

import {TriggerLock} from "../src/utils/lock.js";
import {testFunctionArgType} from "./utils.js";

describe('TriggerLock', () => {
    let error; //reference to https://krasimirtsonev.com/blog/article/jest-mock-console-methods
    beforeEach(() => {
        error = jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
        error.mockReset();
    });

    test('getInstance', () => {
        expect(TriggerLock.getInstance()).toBeInstanceOf(TriggerLock);
        testFunctionArgType(TriggerLock.getInstance);
    });
    test('isLocking', async () => {
        let instance = TriggerLock.getInstance();
        expect(instance.isLocking()).toBeFalsy();
        await instance.trigger(() => {
            expect(instance.isLocking()).toBeTruthy();
        });
        expect(instance.isLocking()).toBeFalsy();
        testFunctionArgType(instance.isLocking);
    });
    test('trigger', async () => {
        let instance = TriggerLock.getInstance();
        expect(instance.isLocking()).toBeFalsy();
        await instance.trigger(async () => {
            expect(instance.isLocking()).toBeTruthy();
        });
        expect(instance.isLocking()).toBeFalsy();
        await instance.trigger(() => {
            throw new Error('throw error');
        });
        expect(instance.isLocking()).toBeFalsy();
    });
    test('release', async () => {
        let instance = TriggerLock.getInstance();
        expect(instance.isLocking()).toBeFalsy();
        await instance.trigger(async () => {
            expect(instance.isLocking()).toBeTruthy();
            instance.release();
            expect(instance.isLocking()).toBeFalsy();
        });
        expect(instance.isLocking()).toBeFalsy();
        testFunctionArgType(instance.release);
    });
});
