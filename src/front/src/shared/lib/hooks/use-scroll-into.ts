import { RefObject, useLayoutEffect } from "react";

export function useScrollInto(
  destination: RefObject<HTMLElement>,
  deps: Array<unknown>
) {
  useLayoutEffect(() => {
    destination.current?.scrollIntoView(true);
  }, [destination, ...deps]);
}
