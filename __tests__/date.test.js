import {formatDate, getDaysBetween, isParsedDate, parseDate, parseDateStr, toDate} from "../src/utils/date.js";

describe('date', function () {
    let error;
    beforeEach(() => {
        error = jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
        error.mockReset();
    });

    test('formatDate', () => {
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
    });

    test('parseStr', () => {
        expect(parseDateStr('2022-01-01')).toEqual({
            year: 2022,
            month: 1,
            date: 1,
        });
        expect(parseDateStr('2022-02-02')).toEqual({
            year: 2022,
            month: 2,
            date: 2,
        });
    });

    test('parseDate', () => {

        let date = new Date('2022-01-01 18:11:00');
        expect(parseDate(date)).toEqual({
            year: 2022,
            month: 1,
            date: 1,
        });
    });
    test('toDate', () => {
        let value = toDate({ year: 2022, month: 2, date: 1 });
        expect(value).toEqual(
            new Date('2022-02-01 00:00:00'),
        );
    });

    test('isADate', () => {
        expect(isParsedDate({ year: 2022, month: 1, date: 1 })).toBeTruthy();
        // expect(isParsedDate()).toBeFalsy();//fixme arguments is empty
        // expect(isParsedDate({})).toBeFalsy();
        expect(isParsedDate({ year: 2022 })).toBeFalsy();
        expect(isParsedDate({ year: 2022, month: 1 })).toBeFalsy();
        expect(isParsedDate({ year: 2022, date: 1 })).toBeFalsy();
    });

    test('howManyDaysBetween', () => {
        expect(
            getDaysBetween(parseDateStr('2022-01-02'), parseDateStr('2022-01-01')),
        ).toBe(-1);
        expect(
            getDaysBetween(parseDateStr('2022-01-01'), parseDateStr('2022-01-01')),
        ).toBe(0);
        expect(
            getDaysBetween(parseDateStr('2022-01-01'), parseDateStr('2022-01-02')),
        ).toBe(1);
        expect(
            getDaysBetween(parseDateStr('2022-01-01'), parseDateStr('2022-01-20')),
        ).toBe(19);
    });

});
