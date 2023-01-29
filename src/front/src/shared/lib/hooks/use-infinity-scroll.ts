import { RefObject, useCallback, useRef } from "react";

export function useInfinityScroll(
  root: RefObject<HTMLElement>,
  fetching: boolean,
  hasMore: boolean,
  onIntersect: () => void
) {
  const observer = useRef<IntersectionObserver>();
  const observedRef = useCallback(
    (node: HTMLDivElement) => {
      if (fetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onIntersect();
          }
        },
        { root: root.current }
      );
      if (node) observer.current.observe(node);
    },
    [fetching, hasMore, onIntersect]
  );

  return observedRef;
}
