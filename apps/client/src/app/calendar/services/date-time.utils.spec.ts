import { getWeekDays } from './date-time.utils';

describe('dateTimeUtils', () => {

  describe('getWeekDays', () => {

    it('should return correct array of 7 days in order for the last day of the month', () => {
      // GIVEN
      const mockLastDayOfMonth = new Date('2023-01-31');
      const expected = [
        { value: 29 },
        { value: 30 },
        { value: 31 },
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
      ];

      // WHEN
      const result = getWeekDays(mockLastDayOfMonth);

      // THEN
      expect(result).toEqual(expected);
    });

    it('should return correct array of 7 days in order for a middle day of the month', () => {
      // GIVEN
      const mockMiddleOfMonth = new Date('2023-01-15');
      const expected = [
        { value: 15 },
        { value: 16 },
        { value: 17 },
        { value: 18 },
        { value: 19 },
        { value: 20 },
        { value: 21 },
      ];

      // WHEN
      const result = getWeekDays(mockMiddleOfMonth);

      // THEN
      expect(result).toEqual(expected);
    });

  });

});
