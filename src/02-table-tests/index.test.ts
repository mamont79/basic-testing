import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: -5, b: 2, action: Action.Add, expected: -3 },
  { a: -3, b: 3, action: Action.Add, expected: 0 },
  { a: -3, b: -22, action: Action.Add, expected: -25 },

  { a: -3, b: -22, action: Action.Subtract, expected: 19 },
  { a: 11, b: 2, action: Action.Subtract, expected: 9 },
  { a: -11, b: -11, action: Action.Subtract, expected: 0 },
  { a: -11, b: 11, action: Action.Subtract, expected: -22 },

  { a: -11, b: 11, action: Action.Multiply, expected: -121 },
  { a: 11, b: 11, action: Action.Multiply, expected: 121 },
  { a: 11, b: 0, action: Action.Multiply, expected: 0 },
  { a: -11, b: -5, action: Action.Multiply, expected: 55 },

  { a: 11, b: 5, action: Action.Divide, expected: 2.2 },
  { a: -10, b: 5, action: Action.Divide, expected: -2 },
  { a: -10, b: -2, action: Action.Divide, expected: 5 },
  { a: 15, b: 0, action: Action.Divide, expected: Infinity },

  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 256, b: 0.5, action: Action.Exponentiate, expected: 16 },
  { a: 8, b: -1, action: Action.Exponentiate, expected: 0.125 },
  { a: -3, b: 3, action: Action.Exponentiate, expected: -27 },
  { a: -3, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 0, b: 5, action: Action.Exponentiate, expected: 0 },

  { a: 0, b: 5, action: 'no', expected: null },
  { a: 0, b: 5, action: 123, expected: null },
  { a: 0, b: 5, action: null, expected: null },

  { a: 0, b: 'dfg', action: Action.Add, expected: null },
  { a: 'chiki', b: 'piki', action: Action.Subtract, expected: null },
  { a: 'qwerty', b: 4, action: Action.Multiply, expected: null },
  { a: 'brrrrr', b: -15, action: Action.Divide, expected: null },
  { a: 'qwerty', b: 'ytrewq', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Should execute action with a and b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
    },
  );
});
