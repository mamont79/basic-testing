// Uncomment the code below and write your tests
import lodash from 'lodash';
import { BankAccount, getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const testAcc = getBankAccount(1000);
    expect(testAcc).toBeDefined();
    expect(testAcc.getBalance()).toEqual(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const testAcc = getBankAccount(1000);
    expect(() => {
      testAcc.withdraw(1500);
    }).toThrow(`Insufficient funds: cannot withdraw more than 1000`);
  });

  test('should throw error when transferring more than balance', () => {
    const testAcc = getBankAccount(1000);
    const someAcc = getBankAccount(1000);
    expect(() => {
      testAcc.transfer(1500, someAcc);
    }).toThrow(`Insufficient funds: cannot withdraw more than 1000`);
  });

  test('should throw error when transferring to the same account', () => {
    const testAcc = getBankAccount(1000);
    expect(() => {
      testAcc.transfer(500, testAcc);
    }).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const testAcc = getBankAccount(1000);
    testAcc.deposit(500);
    expect(testAcc.getBalance()).toEqual(1500);
  });

  test('should withdraw money', () => {
    const testAcc = getBankAccount(1000);
    testAcc.withdraw(500);
    expect(testAcc.getBalance()).toEqual(500);
  });

  test('should transfer money', () => {
    const testAcc = getBankAccount(1000);
    const someAcc = getBankAccount(1000);
    testAcc.transfer(500, someAcc);
    expect(testAcc.getBalance()).toBe(500);
    expect(someAcc.getBalance()).toBe(1500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const testAcc = getBankAccount(1000);
    const spy = jest
      .spyOn(lodash, 'random')
      .mockImplementationOnce(() => 50)
      .mockImplementationOnce(() => 1);

    await expect(testAcc.fetchBalance()).resolves.toBe(50);
    spy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const testAcc = getBankAccount(1000);
    const spy = jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementationOnce(() => Promise.resolve(1500));
    await testAcc.synchronizeBalance();
    expect(testAcc.getBalance()).toBe(1500);
    spy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const testAcc = getBankAccount(1000);
    const spy = jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementationOnce(() => Promise.resolve(null));
    await expect(testAcc.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
    spy.mockRestore();
  });
});
