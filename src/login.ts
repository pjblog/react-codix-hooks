import { useAsyncCallback } from "@codixjs/fetch";
import { login } from "@pjblog/axios";
import { useCallback, useState } from "react";
import { useMyInfo } from "./me";

export function useLogin() {
  const { reload } = useMyInfo();
  const [account, setAccount] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const { execute, ...extras } = useAsyncCallback(login);
  const submit = useCallback(async () => {
    const res = await execute({ account, password });
    reload();
    return res;
  }, [execute, account, password, reload]);

  return {
    ...extras,
    account, setAccount,
    password, setPassword,
    execute: submit,
  }
}