import { createEffect, Effect, sample, Store } from "effector";
import { genUrl } from "../lib/utils/gen-url";

async function request<TReturn>(url: string): Promise<TReturn> {
    const response = await fetch(url);
    const json = await response.json();
    return json as TReturn;
}

export function createRequestFactory<TReturn, TFetch = TReturn>({
    url,
    target,
    fn,
}: {
    url: string;
    target: Store<TReturn>;
    fn?: (data: TFetch) => TReturn;
}): Effect<string | undefined | void, TFetch> {
    const requestFx = createEffect((params?: string) =>
        request<TFetch>(genUrl(`${url}${params ? params : ""}`))
    );

    const safeFn = (data: TFetch) =>
        fn ? fn(data) : (data as unknown as TReturn);

    sample({
        clock: requestFx.doneData,
        fn: (data) => safeFn(data),
        target,
    });

    return requestFx;
}
