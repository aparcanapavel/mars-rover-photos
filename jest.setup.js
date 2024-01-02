import '@testing-library/jest-dom';
import 'jest-fetch-mock';
import crypto from 'crypto';

global.Response = fetch.Response;
Object.defineProperty(global.self, "crypto", {
  value: {
    randomUUID: crypto.randomUUID
  },
});;