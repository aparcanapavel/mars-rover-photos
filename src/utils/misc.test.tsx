import { capitalizeFirstLetter, nFormatter } from './misc';

describe('misc.ts', () => {
  describe('capitalizeFirstLetter(s: string)', () => {
    test('returns an empty string if argument is not a string', () => {
      const result = capitalizeFirstLetter(123 as any); // using "any" for linter
      expect(result).toBe('');
    });
  
    test('returns the string with the first letter capitalized and the rest in lower case', () => {
      const result1 = capitalizeFirstLetter('hello');
      expect(result1).toBe('Hello');
  
      const result2 = capitalizeFirstLetter('wORLD');
      expect(result2).toBe('World');
  
      const result3 = capitalizeFirstLetter('tEst');
      expect(result3).toBe('Test');
    });
  });

  describe('nFormatter', () => {
    test('returns the argument if it is not a number', () => {
      const result = nFormatter('not a number' as any);
      expect(result).toBe('not a number');
    });
  
    test('returns the abbreviated version of thousands value plus "K" if number is greater than 1000', () => {
      const result1 = nFormatter(1500);
      expect(result1).toBe('1.5K');
  
      const result2 = nFormatter(2500);
      expect(result2).toBe('2.5K');
  
      const result3 = nFormatter(50000);
      expect(result3).toBe('50K');
    });
  
    test('returns the number itself if it is less than 1000', () => {
      const result1 = nFormatter(500);
      expect(result1).toBe(500);
  
      const result2 = nFormatter(999);
      expect(result2).toBe(999);
      
      const result3 = nFormatter(1000);
      expect(result3).toBe("1K");
    });
  });
});