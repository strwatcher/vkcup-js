import React, { RefObject } from "react";

export function useClickOutside(
  callback: () => void,
  ...refs: Array<RefObject<HTMLElement>>
) {
  React.useEffect(() => {
    const handleClickOutside = (event: Event) => {
      for (const ref of refs) {
        if (ref.current && ref.current.contains(event.target as Node)) {
          return;
        }
      }

      callback();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs]);
}
