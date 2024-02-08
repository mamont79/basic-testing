// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => 'mocked foo'),
    mockTwo: jest.fn(() => 'mocked bar'),
    mockThree: jest.fn(() => 'mocked baz'),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spy = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();
    expect(spy).not.toBeCalled();

    spy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const spy = jest.spyOn(console, 'log');

    unmockedFunction();
    expect(spy).toBeCalled();

    spy.mockRestore();
  });
});
