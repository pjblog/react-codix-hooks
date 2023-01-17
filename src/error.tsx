import { createContext, FC, Fragment, PropsWithChildren, useContext } from "react";

export interface IError {
  code: number,
  message: string,
}

export const BlogErrorRenderContext = createContext<FC<IError>>(e => <Fragment>{e.code}:{e.message}</Fragment>);
export function useBlogErrorRenderContext() {
  return useContext(BlogErrorRenderContext);
}

export function ErrorBoundary(props: PropsWithChildren<{ error: IError }>)  {
  const ErrorRender = useBlogErrorRenderContext();
  if (props.error) {
    return <ErrorRender code={props.error.code} message={props.error.message} />;
  }
  return props.children as JSX.Element;
}