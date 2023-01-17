import { FC, PropsWithChildren, Suspense, SuspenseProps } from "react";
import { BlogBaseConfigsProvider } from './base';
import { IError, BlogErrorRenderContext } from './error';
import { BlogMyInfoProvider } from './me';
import { ErrorBoundary } from 'react-error-boundary';
import type { IConfigs } from '@pjblog/axios';

export interface IBlogProviderProps {
  fallback?: SuspenseProps['fallback'],
  error: FC<IError>
}

export function BlogProvider<T = any, U extends IConfigs = IConfigs>(props: PropsWithChildren<IBlogProviderProps>) {
  const ErrorComponent = props.error;
  return <ErrorBoundary fallbackRender={that => <ErrorComponent code={0} message={that.error.message} />}>
    <BlogErrorRenderContext.Provider value={props.error}>
      <Suspense fallback={props.fallback}>
        <BlogBaseConfigsProvider<T, U>>
          <Suspense fallback={props.fallback}>
            <BlogMyInfoProvider>
              {props.children}
            </BlogMyInfoProvider>
          </Suspense>
        </BlogBaseConfigsProvider>
      </Suspense>
    </BlogErrorRenderContext.Provider>
  </ErrorBoundary>
}