/* eslint-disable */
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

import { SYSTEM_ERROR, LOCAL_STORAGE_KEY } from 'src/constants';

export class AxiosClient {
  instance: AxiosInstance;

  token: string = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN) ?? '';

  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_VERSION}`,
      headers: {
        Authorization: this.getToken(),
      },
      timeout: 10000,
      timeoutErrorMessage: SYSTEM_ERROR.TIMEOUT_ERROR.MESSAGE,
    });

    this._initializeResponseInterceptor();
  }

  getToken(): string {
    return `Bearer ${this.token}`;
  }

  setToken(token: string): void {
    this.token = token;
  }

  _initializeResponseInterceptor = (): void => {
    this.instance.interceptors.request.use(this._handleRequestSuccess, this._handleRequestError);
    this.instance.interceptors.response.use(this._handleResponseSuccess, this._handleResponseError);
  };

  _handleRequestSuccess = (config: AxiosRequestConfig): any => {
    return config;
  };

  _handleRequestError = (error: AxiosError): any => {
    // eslint-disable-next-line
    console.error(`[request error] [${JSON.stringify(error)}]`);
    if (error.response) {
      return error?.response?.data;
    }

    return Promise.reject(error);
  };

  _handleResponseSuccess = ({ data }: AxiosResponse): AxiosResponse => data;

  _handleResponseError = (error: AxiosError & Error): any => Promise.reject(error?.response?.data);

  async request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
    return await this.instance.request<T, R>(config);
  }

  async get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return await this.instance.get<T, R>(url, config);
  }

  async delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return await this.instance.delete<T, R>(url, config);
  }

  async post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return await this.instance.post<T, R>(url, data, config);
  }

  async put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return await this.instance.put<T, R>(url, data, config);
  }

  async patch<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return await this.instance.patch<T, R>(url, data, config);
  }
}
