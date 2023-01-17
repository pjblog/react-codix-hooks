import { useAsync } from "@codixjs/fetch";
import { createDefaultBlogMyInfoValue, getBlogMyInfo, IUser } from "@pjblog/axios";
import { createContext, PropsWithChildren, useContext } from "react";
import { ErrorBoundary } from "./error";
import { usePolyfill } from "./polyfill";

const BlogMeContext = createContext({ 
  me: createDefaultBlogMyInfoValue(), 
  reload: () => {} 
});

export function BlogMyInfoProvider<T extends IUser = IUser>(props: PropsWithChildren<{}>) {
  const options = usePolyfill();
  const { data, error, execute } = useAsync('me', () => getBlogMyInfo<T>(options));

  return <ErrorBoundary error={error}>
    <BlogMeContext.Provider value={{ me: data, reload: execute }}>
      {props.children}
    </BlogMeContext.Provider>
  </ErrorBoundary>
}

export function useMyInfo<T extends IUser = IUser>() {
  return useContext<{ me: T, reload: () => void }>(BlogMeContext as any);
}