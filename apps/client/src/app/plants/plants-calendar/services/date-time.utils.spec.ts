import { getWeekDays } from './date-time.utils';

describe('DateTimeUtil', () => {

  describe('getWeekDays', () => {

    it('should return correct array of 7 days in order for the last day of the month', () => {
      // GIVEN
      const mockLastDayOfMonth = new Date('2023-01-31');
      const expected = [
        { date: new Date('2023-01-29'), hasEvents: false },
        { date: new Date('2023-01-30'), hasEvents: false },
        { date: new Date('2023-01-31'), hasEvents: false },
        { date: new Date('2023-02-01'), hasEvents: false },
        { date: new Date('2023-02-02'), hasEvents: false },
        { date: new Date('2023-02-03'), hasEvents: false },
        { date: new Date('2023-02-04'), hasEvents: false },
      ];

      // WHEN
      const result = getWeekDays(mockLastDayOfMonth, []);

      // THEN
      expect(result).toEqual(expected);
    });

    it('should return correct array of 7 days in order for a middle day of the month', () => {
      // GIVEN
      const mockMiddleOfMonth = new Date('2023-01-15');
      const expected = [
        { date: new Date('2023-01-15'), hasEvents: false },
        { date: new Date('2023-01-16'), hasEvents: false },
        { date: new Date('2023-01-17'), hasEvents: false },
        { date: new Date('2023-01-18'), hasEvents: false },
        { date: new Date('2023-01-19'), hasEvents: false },
        { date: new Date('2023-01-20'), hasEvents: false },
        { date: new Date('2023-01-21'), hasEvents: false },
      ];

      // WHEN
      const result = getWeekDays(mockMiddleOfMonth, []);

      // THEN
      expect(result).toEqual(expected);
    });

  });

});
