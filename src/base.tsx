import type { AxiosRequestConfig } from 'axios';
import { createContext, PropsWithChildren, useContext } from "react";
import { createDefaultBlogConfigsValue, getBlogConfigs, getBlogThemeConfigs, IConfigs } from '@pjblog/axios';
import { useAsync } from '@codixjs/fetch';
import { ErrorBoundary, useBlogErrorRenderContext } from './error';
import { usePolyfill } from "./polyfill";

const BlogConfigsContext = createContext(createDefaultBlogConfigsValue());
const BlogThemeConfigsContext = createContext<any>({});

export function useBlogConfigsContext<T extends IConfigs = IConfigs>() {
  return useContext<T>(BlogConfigsContext as any);
}

export function useBlogThemeConfigsContext<T = any>() {
  return useContext<T>(BlogThemeConfigsContext);
}

export function BlogBaseConfigsProvider<T = any, U extends IConfigs = IConfigs>(props: PropsWithChildren<{}>) {
  const options = usePolyfill();
  const ErrorComp = useBlogErrorRenderContext();
  const { data: [ configs, themeConfigs ], error } = useAsync('base', () => getBaseRequest<T, U>(options));
  if (configs.close) return <ErrorComp code={499} message="Website closed" />
  return <ErrorBoundary error={error}>
    <BlogConfigsContext.Provider value={configs}>
      <BlogThemeConfigsContext.Provider value={themeConfigs}>
        {props.children}
      </BlogThemeConfigsContext.Provider>
    </BlogConfigsContext.Provider>
  </ErrorBoundary>
}

function getBaseRequest<T = any, U extends IConfigs = IConfigs>(options: AxiosRequestConfig = {}) {
  return Promise.all([
    getBlogConfigs<U>(options),
    getBlogThemeConfigs<T>(options)
  ])
}
