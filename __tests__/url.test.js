import {
    getUrlParam,
    getUrlSearchParam,
    isAbsoluteUrl,
    parseUrl,
    setUrlParam,
    setUrlRandomParam,
    toUrl
} from "../src/utils/url.js";

test("parseUrl", () => {
expect(parseUrl("http://www.baidu.com")).toEqual({
        headOfUrl: "http://www.baidu.com",
        search: "",
        hash: ""
    });
    expect(parseUrl("http://www.baidu.com?name=1")).toEqual({
        headOfUrl: "http://www.baidu.com",
        search: "name=1",
        hash: ""
    });
    expect(parseUrl("http://www.baidu.com?name=1#hash")).toEqual({
        headOfUrl: "http://www.baidu.com",
        search: "name=1",
        hash: "hash"
    });
    expect(parseUrl("http://www.baidu.com#hash")).toEqual({
        headOfUrl: "http://www.baidu.com",
        search: "",
        hash: "hash"
    });
})

test("toUrl", ()=>{
    expect(toUrl({
        headOfUrl: "http://www.baidu.com",
        search: "",
        hash: ""
    })).toBe("http://www.baidu.com");
    expect(toUrl({
        headOfUrl: "http://www.baidu.com",
        search: "name=1",
        hash: ""
    })).toBe("http://www.baidu.com?name=1");
    expect(toUrl({
        headOfUrl: "http://www.baidu.com",
        search: "name=1",
        hash: "hash"
    })).toBe("http://www.baidu.com?name=1#hash");
    expect(toUrl({
        headOfUrl: "http://www.baidu.com",
        search: "",
        hash: "hash"
    })).toBe("http://www.baidu.com#hash");
});

test("getUrlParam", ()=>{
    expect(getUrlParam("http://www.baidu.com?name=1", "name")).toBe("1");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "name")).toBe("1");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
    expect(getUrlParam("http://www.baidu.com?name=1&age=2", "age")).toBe("2");
})

test("getUrlSearchParam", ()=>{
    expect(getUrlSearchParam("http://www.baidu.com?name=1").get("name")).toBe("1");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("name")).toBe("1");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
    expect(getUrlSearchParam("http://www.baidu.com?name=1&age=2").get("age")).toBe("2");
})
test("setUrlParam", ()=>{
    expect(setUrlParam("http://www.baidu.com?name=1", "age", "2")).toBe("http://www.baidu.com?name=1&age=2");
    expect(setUrlParam("http://www.baidu.com?name=1&age=2", "age", "3")).toBe("http://www.baidu.com?name=1&age=3");
    expect(setUrlParam("http://www.baidu.com?name=1&age=2", "name", "2")).toBe("http://www.baidu.com?name=2&age=2");
    expect(setUrlParam("http://www.baidu.com?name=1&age=2", "name", "2")).toBe("http://www.baidu.com?name=2&age=2");
    expect(setUrlParam("http://www.baidu.com?name=1&age=2", "name", "2")).toBe("http://www.baidu.com?name=2&age=2");
    expect(setUrlParam("http://www.baidu.com?name=1&age=2", "name", "2")).toBe("http://www.baidu.com?name=2&age=2");
    expect(setUrlParam("http://www.baidu.com?name=1&age=2", "name", "2")).toBe("http://www.baidu.com?name=2&age=2");
    expect(setUrlParam("http://www.baidu.com?name=1&age=2", "name", "2")).toBe("http://www.baidu.com?name=2&age=2");
    expect(setUrlParam("http://www.baidu.com?name=1&age=2", "name", "2")).toBe("http://www.baidu.com?name=2&age=2");
    expect(setUrlParam("http://www.baidu.com?name=1&age=2", "name", "2")).toBe("http://www.baidu.com?name=2&age=2");
    expect(setUrlParam("http://www.baidu.com?name=1&age=2", "name", "2")).toBe("http://www.baidu.com?name=2&age=2");
    expect(setUrlParam("http://www.baidu.com?name=1&age=2", "name", "2")).toBe("http://www.baidu.com?name=2&age=2");
})


test("setUrlRandomParam", ()=>{
    let url = "http://www.baidu.com?name=1";
    let newUrl = setUrlRandomParam(url);
    expect(newUrl).not.toBe(url);
})

describe('isAbsoluteURL', () => {
    it('should return true for absolute URLs', () => {
        expect(isAbsoluteUrl('http://example.com')).toBe(true);
        expect(isAbsoluteUrl('https://example.com')).toBe(true);
        expect(isAbsoluteUrl('//example.com')).toBe(true);
    });

    it('should return false for non-absolute URLs', () => {
        expect(isAbsoluteUrl('example.com')).toBe(false);
        expect(isAbsoluteUrl('/example')).toBe(false);
        expect(isAbsoluteUrl(123)).toBe(false);
        expect(isAbsoluteUrl(null)).toBe(false);
        expect(isAbsoluteUrl(undefined)).toBe(false);
        expect(isAbsoluteUrl({})).toBe(false);
        expect(isAbsoluteUrl([])).toBe(false);
    });
});