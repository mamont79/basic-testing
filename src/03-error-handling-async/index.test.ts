// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue('qwerty')).toBe('qwerty');
    expect(await resolveValue(159)).toBe(159);
    expect(await resolveValue(true)).toBe(true);
    expect(await resolveValue(null)).toBe(null);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => {
      throwError('Some error message');
    }).toThrow('Some error message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError();
    }).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => {
      throwCustomError();
    }).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(async () => {
      await rejectCustomError();
    }).rejects.toThrow('This is my awesome custom error!');
  });
});
