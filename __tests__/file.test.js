import { getFileExtension, getUrlFileExtension } from "../src/utils/file.js";

describe('getFileExtension', () => {
    test('should return "txt" for filename "hello.txt"', () => {
        expect(getFileExtension('hello.txt')).toBe('txt');
    });

    test('should return an empty string for filename "hello"', () => {
        expect(getFileExtension('hello')).toBe('');
    });

    test('should return "txt" for filename "hello.world.txt"', () => {
        expect(getFileExtension('hello.world.txt')).toBe('txt');
    });

    test('should return "txt" for filename "hello.txt?param=value"', () => {
        expect(getFileExtension('hello.txt?param=value')).toBe('txt');
    });

    test('should return "txt" for filename "hello.txt#hashvalue"', () => {
        expect(getFileExtension('hello.txt#hashvalue')).toBe('txt');
    });

    test('should return "txt" for filename "hello.txt?param=value#hashvalue"', () => {
        expect(getFileExtension('hello.txt?param=value#hashvalue')).toBe('txt');
    });

    test('should return an empty string for an empty filename', () => {
        expect(getFileExtension('')).toBe('');
    });

    test('should return an empty string for filename "."', () => {
        expect(getFileExtension('.')).toBe('');
    });

    test('should return an empty string for filename ".?param=value"', () => {
        expect(getFileExtension('.?param=value')).toBe('');
    });

    test('should return an empty string for filename ".#hashvalue"', () => {
        expect(getFileExtension('.#hashvalue')).toBe('');
    });

    test('should return an empty string for filename ".?param=value#hashvalue"', () => {
        expect(getFileExtension('.?param=value#hashvalue')).toBe('');
    });
});

describe('getUrlFileExtension', () => {
    test('should return "txt" for url "https://example.com/hello.txt"', () => {
        expect(getUrlFileExtension('https://example.com/hello.txt')).toBe('txt');
    });

    test('should return "jpg" for url "https://example.com/images/photo.jpg"', () => {
        expect(getUrlFileExtension('https://example.com/images/photo.jpg')).toBe('jpg');
    });

    test('should return an empty string for url "https://example.com"', () => {
        expect(getUrlFileExtension('https://example.com')).toBe('');
    });

    test('should return an empty string for url "https://example.com/"', () => {
        expect(getUrlFileExtension('https://example.com/')).toBe('');
    });

    test('should return "html" for url "https://example.com/index.html"', () => {
        expect(getUrlFileExtension('https://example.com/index.html')).toBe('html');
    });

    test('should return "png" for url "https://example.com/images/logo.png?param=value"', () => {
        expect(getUrlFileExtension('https://example.com/images/logo.png?param=value')).toBe('png');
    });

    test('should return "css" for url "https://example.com/styles/main.css#section"', () => {
        expect(getUrlFileExtension('https://example.com/styles/main.css#section')).toBe('css');
    });

    test('should return an empty string for an empty url', () => {
        expect(getUrlFileExtension('')).toBe('');
    });

    test('should return "jpg" for url "//example.com/images/photo.jpg"', () => {
        expect(getUrlFileExtension('//example.com/images/photo.jpg')).toBe('jpg');
    });

    test('should return "" for url "/index.html"', () => {
        expect(getUrlFileExtension('/index.html')).toBe('');
    });
});