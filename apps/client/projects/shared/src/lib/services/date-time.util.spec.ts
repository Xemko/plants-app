import { areLocaleDatesEqual } from './date-time.util';

describe('DateTimeUtil', () => {

  describe('areLocaleDatesEqual', () => {

    it('should return true when dates are equal', () => {
      // GIVEN
      const dateA = new Date('2021-01-01');
      const dateB = new Date('2021-01-01');

      // WHEN
      const result = areLocaleDatesEqual(dateA)(dateB);

      // THEN
      expect(result).toBe(true);
    });

    it('should return false when dates are not equal', () => {
      // GIVEN
      const dateA = new Date('2021-01-01');
      const dateB = new Date('2021-01-02');

      // WHEN
      const result = areLocaleDatesEqual(dateA)(dateB);

      // THEN
      expect(result).toBe(false);
    });
  });

});
