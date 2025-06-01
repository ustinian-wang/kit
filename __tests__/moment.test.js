import moment from 'moment';
import {
  stringToMoment,
  timestampToMoment,
  dateToMoment,
  dateArrToMoment,
  isoStrToMoment,
  objToMoment,
  utcStrToMoment,
  millisToDuration,
  momentToString,
  momentToTimestamp,
  momentToDate,
  momentToUTCString,
  durationToMillis,
  getWeek,
  str2Unix,
  isSameDay,
  isToday,
  getZeroMoment,
  isTodayBefore,
  extendTime
} from '../src/libs/moment';

describe('Moment Utility Functions', () => {
  // 固定测试时间为 2024-03-15 14:30:00
  const fixedDate = new Date('2024-03-15T14:30:00Z');
  
  beforeEach(() => {
    // 模拟当前时间
    jest.useFakeTimers();
    jest.setSystemTime(fixedDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('stringToMoment', () => {
    it('should convert string to moment object with default format', () => {
      const result = stringToMoment('2024-03-15 14:30:00');
      expect(result.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 14:30:00');
    });

    it('should convert string to moment object with custom format', () => {
      const result = stringToMoment('15/03/2024', 'DD/MM/YYYY');
      expect(result.format('YYYY-MM-DD')).toBe('2024-03-15');
    });
  });

  describe('timestampToMoment', () => {
    it('should convert timestamp to moment object', () => {
      const timestamp = fixedDate.getTime();
      const result = timestampToMoment(timestamp);
      expect(result.valueOf()).toBe(timestamp);
    });
  });

  describe('dateToMoment', () => {
    it('should convert Date object to moment object', () => {
      const result = dateToMoment(fixedDate);
      expect(result.toDate()).toEqual(fixedDate);
    });
  });

  describe('dateArrToMoment', () => {
    it('should convert date array to moment object', () => {
      const result = dateArrToMoment([2024, 2, 15]); // 注意：月份从0开始
      expect(result.format('YYYY-MM-DD')).toBe('2024-03-15');
    });
  });

  describe('isoStrToMoment', () => {
    it('should convert ISO string to moment object', () => {
      const result = isoStrToMoment('2024-03-15T14:30:00Z');
      expect(result.toISOString()).toBe('2024-03-15T14:30:00.000Z');
    });
  });

  describe('objToMoment', () => {
    it('should convert object to moment object', () => {
      const result = objToMoment({ year: 2024, month: 2, day: 15 }); // 注意：月份从0开始
      expect(result.format('YYYY-MM-DD')).toBe('2024-03-15');
    });
  });

  describe('utcStrToMoment', () => {
    it('should convert UTC string to moment object', () => {
      const result = utcStrToMoment('2024-03-15T14:30:00Z');
      expect(result.utc().format()).toBe('2024-03-15T14:30:00Z');
    });
  });

  describe('millisToDuration', () => {
    it('should convert milliseconds to duration', () => {
      const result = millisToDuration(3600000); // 1 hour in milliseconds
      expect(result.asHours()).toBe(1);
    });
  });

  describe('momentToString', () => {
    it('should convert moment to string with default format', () => {
      const momentObj = moment('2024-03-15T14:30:00');
      const result = momentToString(momentObj);
      expect(result).toMatch(/2024-03-15T14:30:00/); // 时区可能不同，所以用正则匹配
    });
  });

  describe('momentToTimestamp', () => {
    it('should convert moment to timestamp', () => {
      const momentObj = moment(fixedDate);
      const result = momentToTimestamp(momentObj);
      expect(result).toBe(fixedDate.getTime());
    });
  });

  describe('momentToDate', () => {
    it('should convert moment to Date object', () => {
      const momentObj = moment(fixedDate);
      const result = momentToDate(momentObj);
      expect(result).toEqual(fixedDate);
    });
  });

  describe('momentToUTCString', () => {
    it('should convert moment to UTC string', () => {
      const momentObj = moment('2024-03-15T14:30:00Z');
      const result = momentToUTCString(momentObj);
      expect(result).toBe('2024-03-15T14:30:00Z');
    });
  });

  describe('durationToMillis', () => {
    it('should convert duration to milliseconds', () => {
      const duration = moment.duration(1, 'hours');
      const result = durationToMillis(duration);
      expect(result).toBe(3600000);
    });
  });

  describe('getWeek', () => {
    it('should return correct week number (1-7)', () => {
      const friday = moment('2024-03-15'); // 这是星期五
      expect(getWeek(friday)).toBe(5);
    });

    it('should return 7 for Sunday', () => {
      const sunday = moment('2024-03-17'); // 这是星期日
      expect(getWeek(sunday)).toBe(7);
    });
  });

  describe('str2Unix', () => {
    it('should convert string to Unix timestamp', () => {
      const result = str2Unix('2024-03-15 14:30:00');
      expect(result).toBe(moment('2024-03-15 14:30:00').unix());
    });
  });

  describe('isSameDay', () => {
    it('should return true for same day', () => {
      const date1 = moment('2024-03-15 14:30:00');
      const date2 = moment('2024-03-15 18:45:00');
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('should return false for different days', () => {
      const date1 = moment('2024-03-15');
      const date2 = moment('2024-03-16');
      expect(isSameDay(date1, date2)).toBe(false);
    });
  });

  describe('isToday', () => {
    it('should return true for today', () => {
      const today = moment();
      expect(isToday(today)).toBe(true);
    });

    it('should return false for other days', () => {
      const tomorrow = moment().add(1, 'days');
      expect(isToday(tomorrow)).toBe(false);
    });
  });

  describe('getZeroMoment', () => {
    it('should return start of day', () => {
      const result = getZeroMoment('2024-03-15 14:30:00');
      expect(result.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 00:00:00');
    });
  });

  describe('isTodayBefore', () => {
    it('should return true for past dates', () => {
      const yesterday = moment().subtract(1, 'days');
      expect(isTodayBefore(yesterday)).toBe(true);
    });

    it('should return false for future dates', () => {
      const tomorrow = moment().add(1, 'days');
      expect(isTodayBefore(tomorrow)).toBe(false);
    });
  });

  describe('extendTime', () => {
    it('should extend time from target moment', () => {
      const origin = moment('2024-03-15 00:00:00');
      const target = moment('2024-03-16 14:30:45');
      const result = extendTime(origin, target);
      expect(result.format('HH:mm:ss')).toBe('14:30:45');
      expect(result.format('YYYY-MM-DD')).toBe('2024-03-15');
    });
  });
}); 