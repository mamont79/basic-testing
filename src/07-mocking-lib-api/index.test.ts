// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const urlPath = 'tasks';

  test('should create instance with provided base url', async () => {
    const getSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: 'data' }));

    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(urlPath);

    expect(spy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

    getSpy.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const spy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: 'waiting for data' }));

    await throttledGetDataFromApi(urlPath);
    jest.runAllTimers();

    expect(spy).toBeCalledWith(urlPath);

    spy.mockRestore();
  });

  test('should return response data', async () => {
    const spy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(() => Promise.resolve({ data: 'data to receive' }));

    const reseiveData = await throttledGetDataFromApi(urlPath);
    jest.runAllTimers();

    expect(reseiveData).toBe('data to receive');

    spy.mockRestore();
  });
});
