import { useEffect, useLayoutEffect, useRef } from "react";

export function useScrollTop<T extends HTMLElement>(deps: Array<unknown>) {
  const ref = useRef<T>(null);
  useLayoutEffect(
    () => ref.current?.scroll({ top: 0, left: 0, behavior: "smooth" }),
    [deps]
  );
  return ref;
}
