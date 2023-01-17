import { useAsync } from '@codixjs/fetch';
import { Plugin as AxiosPlugin } from '@pjblog/axios';
import { usePolyfill } from './polyfill';
import { DependencyList } from 'react';
import type { AxiosRequestConfig } from 'axios';

export class Plugin extends AxiosPlugin {
  private _mergeHeaders(configs: AxiosRequestConfig, options: AxiosRequestConfig) {
    options.headers = options.headers 
      ? Object.assign({}, options.headers, configs.headers) 
      : configs.headers;
    return Object.assign({}, configs, options);
  }

  public useGet<T = any>(id: string, configs: {
    url: string,
    querys: object,
    headers: object,
  }, deps?: DependencyList) {
    const options = usePolyfill();
    return useAsync(id, () => {
      return this.get<T>(configs.url, this._mergeHeaders(options, {
        params: configs.querys,
        headers: configs.headers,
      }))
    }, deps);
  }

  public usePost<T = any>(id: string, configs: {
    url: string,
    querys: object,
    headers: object,
    data: any,
  }, deps?: DependencyList) {
    const options = usePolyfill();
    return useAsync(id, () => {
      return this.post<T>(configs.url, configs.data, this._mergeHeaders(options, {
        params: configs.querys,
        headers: configs.headers,
      }))
    }, deps);
  }

  public usePut<T = any>(id: string, configs: {
    url: string,
    querys: object,
    headers: object,
    data: any,
  }, deps?: DependencyList) {
    const options = usePolyfill();
    return useAsync(id, () => {
      return this.put<T>(configs.url, configs.data, this._mergeHeaders(options, {
        params: configs.querys,
        headers: configs.headers,
      }))
    }, deps);
  }

  public useDel<T = any>(id: string, configs: {
    url: string,
    querys: object,
    headers: object,
  }, deps?: DependencyList) {
    const options = usePolyfill();
    return useAsync(id, () => {
      return this.delete<T>(configs.url, this._mergeHeaders(options, {
        params: configs.querys,
        headers: configs.headers,
      }))
    }, deps);
  }
}