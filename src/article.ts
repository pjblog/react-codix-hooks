import { useAsync } from "@codixjs/fetch";
import { getBlogArticleDetail, IArticleWithHtml } from "@pjblog/axios";
import { usePolyfill } from "./polyfill";

export function useArticle<T extends IArticleWithHtml = IArticleWithHtml>(code: string) {
  const options = usePolyfill();
  return useAsync('article:' + code, () => getBlogArticleDetail<T>(code, options), [code]);
}