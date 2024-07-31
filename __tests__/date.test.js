import {formatTimeToStr, howManyDaysBetween, isADate, parseDate, parseStr, toDate, add} from "../src/utils/date.js";
import {testFunctionArgType} from "./utils.js";

describe('date', function () {
    let error;
    beforeEach(() => {
        error = jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
        error.mockReset();
    });

    /*test('formatDate', () => {
        testFunctionArgType(formatDate);
        expect(formatDate('2022-01-01 18:11:11', 'YYYY.MM.DD hh:mm:ss')).toBe(
            '2022.01.01 18:11:11',
        );
        expect(formatDate('2022-01-01 18:11:11', 'YYYY/MM/DD hh:mm:ss')).toBe(
            '2022/01/01 18:11:11',
        );
        expect(formatDate('2022-01-01 18:11:11', 'YYYY/MM/DD hh:mm:ss')).toBe(
            '2022/01/01 18:11:11',
        );
        expect(formatDate('2022-01-01 18:11:11', 'YYYY.MM.DD hh:mm')).toBe(
            '2022.01.01 18:11',
        );
        expect(formatDate('2022-01-01 18:11:11', 'YYYY.MM.DD hh')).toBe(
            '2022.01.01 18',
        );
        expect(formatDate(new Date('2022-01-01 18:11:11'), 'YYYY.MM.DD')).toBe(
            '2022.01.01',
        );
        //the date may be from backend, i can't control the way to pass
        // expect(formatDate(true, 'YYYY.MM.DD')).toBeUndefined();
    });*/

    test('parseStr', () => {
        testFunctionArgType(parseStr);
        expect(parseStr('2022-01-01')).toEqual({
            year: 2022,
            month: 1,
            date: 1,
        });
        expect(parseStr('2022-02-02')).toEqual({
            year: 2022,
            month: 2,
            date: 2,
        });
    });

    test('parseDate', () => {
        testFunctionArgType(parseDate);

        let date = new Date('2022-01-01 18:11:00');
        expect(parseDate(date)).toEqual({
            year: 2022,
            month: 1,
            date: 1,
        });
    });
    test('toDate', () => {
        testFunctionArgType(toDate);

        expect(toDate({ year: 2022, month: 2, date: 1 })).toEqual(
            new Date('2022-02-01 00:00:00'),
        );
    });

    test('isADate', () => {
        testFunctionArgType(isADate);
        expect(isADate({ year: 2022, month: 1, date: 1 })).toBeTruthy();
        // expect(isADate()).toBeFalsy();//fixme arguments is empty
        // expect(isADate({})).toBeFalsy();
        expect(isADate({ year: 2022 })).toBeFalsy();
        expect(isADate({ year: 2022, month: 1 })).toBeFalsy();
        expect(isADate({ year: 2022, date: 1 })).toBeFalsy();
    });

    test('add', () => {
        testFunctionArgType(add);
        expect(add(new Date('2022-01-01 00:00:00'), 1, 'days')).toEqual(
            new Date('2022-01-02 00:00:00'),
        );
        expect(add(new Date('2022-01-01 00:00:00'), 2, 'days')).toEqual(
            new Date('2022-01-03 00:00:00'),
        );
    });

    test('howManyDaysBetween', () => {
        expect(
            howManyDaysBetween(parseStr('2022-01-02'), parseStr('2022-01-01')),
        ).toBe(-1);
        expect(
            howManyDaysBetween(parseStr('2022-01-01'), parseStr('2022-01-01')),
        ).toBe(0);
        expect(
            howManyDaysBetween(parseStr('2022-01-01'), parseStr('2022-01-02')),
        ).toBe(1);
        expect(
            howManyDaysBetween(parseStr('2022-01-01'), parseStr('2022-01-20')),
        ).toBe(19);
    });

    test('formatTime', () => {
        testFunctionArgType(formatTimeToStr);
        expect(formatTimeToStr(-1)).toBe('00');
        expect(formatTimeToStr(1)).toBe('01');
        expect(formatTimeToStr(9)).toBe('09');
        expect(formatTimeToStr(10)).toBe('10');
        expect(formatTimeToStr(22)).toBe('22');
        expect(formatTimeToStr(300)).toBe('300');
    });
});
