import { useAsyncCallback } from "@codixjs/fetch";
import { password } from "@pjblog/axios";
import { useCallback, useState } from "react";
import { useMyInfo } from "./me";

export function usePassword() {
  const { reload } = useMyInfo();
  const [oldPassword, setOldPassword] = useState<string>(null);
  const [newPassword, setNewPassword] = useState<string>(null);
  const [comPassword, setComPassword] = useState<string>(null);
  const { execute, ...extras } = useAsyncCallback(password);

  const submit = useCallback(async () => {
    const res = await execute({
      oldPassword, newPassword
    });
    reload();
    return res;
  }, [execute, oldPassword, newPassword, reload]);

  return {
    ...extras,
    oldPassword, setOldPassword,
    newPassword, setNewPassword,
    comPassword, setComPassword,
    execute: submit,
  }
}