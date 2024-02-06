import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 11, b: 2, action: Action.Add })).toBe(13);
    expect(simpleCalculator({ a: 5, b: -32, action: Action.Add })).toBe(-27);
    expect(simpleCalculator({ a: 4, b: -4, action: Action.Add })).toBe(0);
    expect(simpleCalculator({ a: -1, b: -2, action: Action.Add })).toBe(-3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 11, b: 2, action: Action.Subtract })).toBe(9);
    expect(simpleCalculator({ a: 11, b: -2, action: Action.Subtract })).toBe(
      13,
    );
    expect(simpleCalculator({ a: -2, b: -2, action: Action.Subtract })).toBe(0);
    expect(simpleCalculator({ a: -22, b: 2, action: Action.Subtract })).toBe(
      -24,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 11, b: 2, action: Action.Multiply })).toBe(22);
    expect(simpleCalculator({ a: -11, b: 2, action: Action.Multiply })).toBe(
      -22,
    );
    expect(simpleCalculator({ a: 11, b: 0, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: -11, b: -22, action: Action.Multiply })).toBe(
      242,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 11, b: 2, action: Action.Divide })).toBe(5.5);
    expect(simpleCalculator({ a: -15, b: 5, action: Action.Divide })).toBe(-3);
    expect(simpleCalculator({ a: 0, b: 5, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: 10, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 11, b: 2, action: Action.Exponentiate })).toBe(
      121,
    );
    expect(
      simpleCalculator({ a: 64, b: 0.5, action: Action.Exponentiate }),
    ).toBe(8);
    expect(simpleCalculator({ a: -3, b: 3, action: Action.Exponentiate })).toBe(
      -27,
    );
    expect(simpleCalculator({ a: 4, b: -1, action: Action.Exponentiate })).toBe(
      0.25,
    );
    expect(simpleCalculator({ a: 4, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 0, b: 10, action: Action.Exponentiate })).toBe(
      0,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 11, b: 2, action: null })).toBe(null);
    expect(simpleCalculator({ a: 11, b: 2, action: 'no' })).toBe(null);
    expect(simpleCalculator({ a: 11, b: 2, action: 123 })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 2, b: 'qwerty', action: Action.Add })).toBe(
      null,
    );
    expect(
      simpleCalculator({ a: 'brrrrr', b: '-15', action: Action.Subtract }),
    ).toBe(null);
    expect(
      simpleCalculator({ a: 'check', b: 'fail', action: Action.Multiply }),
    ).toBe(null);
    expect(simpleCalculator({ a: 0, b: 'qwerty', action: Action.Divide })).toBe(
      null,
    );
    expect(
      simpleCalculator({ a: 'ding', b: 'dong', action: Action.Exponentiate }),
    ).toBe(null);
  });
});
