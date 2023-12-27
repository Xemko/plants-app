import { FirstKeyPipe } from './first-error.pipe';

describe('FirstKeyPipe', () => {
  let pipe: FirstKeyPipe = new FirstKeyPipe();

  beforeEach(() => {
    pipe = new FirstKeyPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {

    it('should return null when value is falsy', () => {
      // WHEN - value is null
      const resultNull = pipe.transform(null);

      // THEN
      expect(resultNull).toBeNull();

      // WHEN - value is undefined
      const resultUndefined = pipe.transform(undefined);

      // THEN
      expect(resultUndefined).toBeNull();

      // WHEN - value is empty object
      const resultEmptyObject = pipe.transform({});

      // THEN
      expect(resultEmptyObject).toBeNull();
    });

    it('should return the first key when value is object with one key', () => {
      // WHEN
      const result = pipe.transform({ a: 'b' });

      // THEN
      expect(result).toEqual('a');
    });

    it('should return the first key when value is object with multiple keys', () => {
      // WHEN
      const result = pipe.transform({ a: 'b', c: 'd' });

      // THEN
      expect(result).toEqual('a');
    });

  });

});
