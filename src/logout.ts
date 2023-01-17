import { useAsyncCallback } from "@codixjs/fetch";
import { logout } from "@pjblog/axios";
import { useCallback } from "react";
import { useMyInfo } from "./me";

export function useLogout() {
  const { reload } = useMyInfo();
  const { execute, ...extras } = useAsyncCallback(logout);
  const submit = useCallback(async () => {
    const res = await execute();
    reload();
    return res;
  }, [execute, reload]);
  return {
    ...extras,
    execute: submit,
  }
}