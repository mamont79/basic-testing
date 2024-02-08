// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callbackFn = jest.fn(() => 'callback function');
    doStuffByTimeout(callbackFn, 1000);
    expect(setTimeout).toBeCalledWith(callbackFn, 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callbackFn = jest.fn(() => 'callback function');

    doStuffByTimeout(callbackFn, 1000);
    expect(callbackFn).toBeCalledTimes(0);
    jest.advanceTimersByTime(1000);
    expect(callbackFn).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callbackFn = jest.fn(() => 'callback function');
    doStuffByInterval(callbackFn, 1000);
    expect(setInterval).toBeCalledWith(callbackFn, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callbackFn = jest.fn(() => 'callback function');

    doStuffByInterval(callbackFn, 1000);
    expect(callbackFn).toBeCalledTimes(0);

    jest.advanceTimersByTime(1000);
    expect(callbackFn).toBeCalledTimes(1);

    jest.advanceTimersByTime(5000);
    expect(callbackFn).toBeCalledTimes(6);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'README.md';
    const spy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);
    expect(spy).toBeCalledWith(__dirname, pathToFile);
    spy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const falseFile = 'falseFile.txt';
    const spy = jest.spyOn(fs, 'existsSync').mockImplementation(() => false);

    await expect(readFileAsynchronously(falseFile)).resolves.toBeNull();
    spy.mockRestore();
  });

  test('should return file content if file exists', async () => {
    const fileToRead = 'readableFile.txt';

    const spyExist = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const spyRead = jest
      .spyOn(fs.promises, 'readFile')
      .mockResolvedValue('some text in this file');

    expect(await readFileAsynchronously(fileToRead)).toBe(
      'some text in this file',
    );

    spyRead.mockRestore();
    spyExist.mockRestore();
  });
});
