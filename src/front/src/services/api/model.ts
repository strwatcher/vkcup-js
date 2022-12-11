import { createEffect, createStore, Store } from "effector";
import config from "./config.json";

type IApiConfig = {
  base: string;
};

config as IApiConfig;

export const genUrl = (url: string) => {
  const baseUrl = config.base;
  return baseUrl + url;
};

async function request<TReturn>(url: string): Promise<TReturn> {
  const response = await fetch(url);
  const json = await response.json();
  return json as TReturn;
}

export const createRequestFactory = <TReturn>(
  url: string,
  target?: Store<TReturn>
) => {
  const requestFx = createEffect((params?: string) =>
    request<TReturn>(genUrl(`${url}${!!params ? params : ""}`))
  );
  if (target) {
    target.on(requestFx.doneData, (_, data) => data);
  }
  const $data = createStore<TReturn | null>(null).on(
    requestFx.doneData,
    (_, data) => data
  );

  return { requestFx, $data };
};
