import { useAsync } from "@codixjs/fetch";
import { getBlogCategories, ICategory } from "@pjblog/axios";
import { usePolyfill } from "./polyfill";

export function useCategories<T extends ICategory = ICategory>() {
  const options = usePolyfill();
  return useAsync('categories', () => getBlogCategories<T>(options));
}