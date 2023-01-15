import { useState, useCallback, useEffect, RefObject } from "react";

export function useHover(ref: RefObject<HTMLElement>) {
  const [hover, setHover] = useState(false);
  const onMouseOver = useCallback(() => {
    setHover(true);
  }, []);
  const onMouseOut = useCallback(() => {
    setHover(false);
  }, []);

  useEffect(() => {
    ref.current?.addEventListener("mouseover", onMouseOver);
    ref.current?.addEventListener("mouseout", onMouseOut);

    return () => {
      ref.current?.removeEventListener("mouseover", onMouseOver);
      ref.current?.removeEventListener("mouseout", onMouseOut);
    };
  }, [ref.current]);

  return hover;
}
