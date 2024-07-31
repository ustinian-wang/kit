import {serializeObjParamOfGet} from "../src/request/interceptors.js";
import {objectToQueryString} from "../src/utils/str.js";

test.skip("serializeObjParamOfGet", ()=> {
    let params = serializeObjParamOfGet({
        wgd: {k: {b: 'faid3ev3#x60;`'}}
    })
    let qs = objectToQueryString(params);
    expect(qs).toEqual('wgd=%7B%22k%22%3A%7B%22b%22%3A%22faid3ev3%23x60%3B%60%22%7D%7D')
})