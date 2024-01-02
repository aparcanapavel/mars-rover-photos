/**
 * @jest-environment jsdom
 */
import { NextURL } from 'next/dist/server/web/next-url';
import { middleware } from './middleware';
import { NextRequest } from 'next/server';

jest.mock('next/dist/server/web/spec-extension/user-agent', () =>{
  return {
    userAgent: jest.fn().mockReturnValue({
      device: {
        type: 'mobile',
      },
    }),
  }
});

describe('middleware', () => {
  
  it('should set the viewport query parameter to what the user agent device returns', () => {
    const request = {
      nextUrl: new NextURL('https://example.com') as NextURL,
    };

    middleware(request as NextRequest);
    expect(request.nextUrl.searchParams.get('viewport')).toBe('mobile');
  });

  
});