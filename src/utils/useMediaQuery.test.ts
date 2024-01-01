import './matchMedia.mock';
import { renderHook } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {

  beforeEach(() => {
    window.matchMedia = jest.fn(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return true when matchMedia returns { matches: true }', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
    const { result } = renderHook(() => useMediaQuery(600));
    expect(result.current).toBe(true);
  });

  it('should return false when matchMedia returns { matches: false }', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))
    const { result } = renderHook(() => useMediaQuery(600));
    expect(result.current).toBe(false);
  });
});