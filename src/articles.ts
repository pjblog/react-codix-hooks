import { useAsync } from "@codixjs/fetch";
import { getBlogArticles, IArticleSearchParams, IAricleWithSummary } from "@pjblog/axios";
import { usePolyfill } from "./polyfill";

export function useArticles<T extends IAricleWithSummary = IAricleWithSummary>(configs: IArticleSearchParams = {}) {
  const options = usePolyfill();
  return useAsync('articles', () => getBlogArticles<T>(configs, options), [
    configs.category,
    configs.keyword,
    configs.page,
    configs.tag
  ]);
}