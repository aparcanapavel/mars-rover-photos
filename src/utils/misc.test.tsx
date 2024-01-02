/**
 * @jest-environment jsdom
 */
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { addSearchParams, capitalizeFirstLetter, nFormatter, parseDate } from './misc';

describe('misc.ts', () => {
  describe('capitalizeFirstLetter(s: string)', () => {
    it('returns an empty string if argument is not a string', () => {
      const result = capitalizeFirstLetter(123 as unknown as string);
      expect(result).toBe('');
    });
  
    it('returns the string with the first letter capitalized and the rest in lower case', () => {
      const result1 = capitalizeFirstLetter('hello');
      expect(result1).toBe('Hello');
  
      const result2 = capitalizeFirstLetter('wORLD');
      expect(result2).toBe('World');
  
      const result3 = capitalizeFirstLetter('tEst');
      expect(result3).toBe('Test');
    });
  });

  describe('nFormatter', () => {
    it('returns the argument if it is not a number', () => {
      const result = nFormatter('not a number' as unknown as number);
      expect(result).toBe('not a number');
    });
  
    it('returns the abbreviated version of thousands value plus "K" if number is greater than 1000', () => {
      const result1 = nFormatter(1500);
      expect(result1).toBe('1.5K');
  
      const result2 = nFormatter(2500);
      expect(result2).toBe('2.5K');
  
      const result3 = nFormatter(50000);
      expect(result3).toBe('50K');
    });

    it('returns the abbreviated version of millions value plus "M" if number is greater than or equal to 1,000,000', () => {
      const result1 = nFormatter(1000000);
      expect(result1).toBe('1M');
  
      const result2 = nFormatter(2500000);
      expect(result2).toBe('2.5M');
  
      const result3 = nFormatter(50000000);
      expect(result3).toBe('50M');
    });
  
    it('returns the abbreviated version of billions value plus "B" if number is greater than or equal to 1,000,000,000', () => {
      const result1 = nFormatter(1000000000);
      expect(result1).toBe('1B');
  
      const result2 = nFormatter(2500000000);
      expect(result2).toBe('2.5B');
  
      const result3 = nFormatter(50000000000);
      expect(result3).toBe('50B');
    });
  
    it('returns the number itself if it is less than 1000', () => {
      const result1 = nFormatter(500);
      expect(result1).toBe(500);
  
      const result2 = nFormatter(999);
      expect(result2).toBe(999);
      
      const result3 = nFormatter(1000);
      expect(result3).toBe("1K");
    });
  });

  describe('parseDate', () => {
    it('returns the parsed date in English form', () => {
      const result1 = parseDate('2023-12-01');
      expect(result1).toBe('December 1, 2023');
  
      const result2 = parseDate('2022-02-14');
      expect(result2).toBe('February 14, 2022');
  
      const result3 = parseDate('2023-07-10');
      expect(result3).toBe('July 10, 2023');
    });
  });

  describe('addSearchParams', () => {
    let router: AppRouterInstance;

    beforeEach(() => {
      router = {
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(), 
        forward: jest.fn(), 
        refresh: jest.fn(),
      };
    })
    
    it('should update the URL with the new search parameters', () => {
      const newSol = '123';
      const newPage = '2';
      const pathname = '/rover/curiosity';
      const searchParams = new URLSearchParams('?sol=122&page=2');
  
      addSearchParams(newSol, newPage, router, pathname, searchParams);
  
      expect(router.push).toHaveBeenCalledWith(`${pathname}?sol=123&page=2`);
    });
    
    it('should handle empty searchParams', () => {
      const newSol = '123';
      const newPage = '2';
      const pathname = '/rover/curiosity';
      const searchParams = new URLSearchParams('');
  
      addSearchParams(newSol, newPage, router, pathname, searchParams);
  
      expect(router.push).toHaveBeenCalledWith(`${pathname}?sol=123&page=2`);
    });
  });
});