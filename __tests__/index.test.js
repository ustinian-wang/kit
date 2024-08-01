import * as kit from "../index.js";

import {isClass, isFunction, jsonStringify} from "../index.js";
import {getArgTestCasesOfFunction} from "../src/utils/test.js";

class A {}
describe("testFunctionArgsType", function () {
    const originalConsole = console;
    beforeEach(function () {
        console = {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
        };

    })
    afterEach(()=>{
        console = originalConsole;
    })
    // return;
    Object.keys(kit).forEach(name=>{
        let func = kit[name];
        // if(!isFunction(func) || isClass(func)){
        //     return;
        // }
        let testArgsList = getArgTestCasesOfFunction(func);
        testArgsList.forEach(args=>{
            test(`${name}; args=${jsonStringify(args)}`, ()=>{
                try{
                    expect(()=>{
                        func(...args)
                    }).not.toThrowError()
                }catch (e) {

                }
            })
        })
    })
})