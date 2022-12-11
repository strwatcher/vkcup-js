import { createEffect, createStore } from "effector";
import config from "./config.json";

type IApiConfig = {
  base: string;
};

config as IApiConfig;

async function request<TReturn>(url: string): Promise<TReturn> {
  const response = await fetch(url);
  const json = await response.json();
  return json as TReturn;
}

export const createRequestFactory = <TReturn>(url: string) => {
  const baseUrl = config.base;
  const requestFx = createEffect(() => request<TReturn>(baseUrl + url));
  const $data = createStore<TReturn | null>(null).on(
    requestFx.doneData,
    (_, data) => data
  );

  return { requestFx, $data };
};
