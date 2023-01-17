import { useAsyncCallback } from "@codixjs/fetch";
import { profile } from "@pjblog/axios";
import { useCallback, useState } from "react";
import { useMyInfo } from "./me";

export function useProfile() {
  const { reload, me } = useMyInfo();
  const [nickname, setNickname] = useState<string>(me.nickname);
  const [email, setEmail] = useState<string>(me.email);
  const [avatar, setAvatar] = useState<string>(me.avatar);
  const [website, setWebsite] = useState<string>(me.website);
  const { execute, ...extras } = useAsyncCallback(profile);

  const submit = useCallback(async () => {
    const res = await execute({
      nickname, email, avatar, website
    });
    reload();
    return res;
  }, [execute, nickname, email, avatar, website, reload]);

  return {
    ...extras,
    nickname, setNickname,
    email, setEmail,
    avatar, setAvatar,
    website, setWebsite,
    execute: submit,
  }
}