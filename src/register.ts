import { useAsyncCallback } from "@codixjs/fetch";
import { register } from "@pjblog/axios";
import { useCallback, useState } from "react";
import { useMyInfo } from "./me";

export function useRegister() {
  const { reload } = useMyInfo();
  const [account, setAccount] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>(null);
  const { execute, ...extras } = useAsyncCallback(register);

  const submit = useCallback(async () => {
    const res = await execute({
      account, password
    });
    reload();
    return res;
  }, [execute, account, password, reload]);

  return {
    ...extras,
    account, setAccount,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    execute: submit,
  }
}