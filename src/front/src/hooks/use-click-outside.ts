import React, { RefObject } from "react";

export function useClickOutside(
    callback: Function,
    ...refs: Array<RefObject<any>>
) {
    React.useEffect(() => {
        const handleClickOutside = (event: Event) => {
            for (let ref of refs) {
                if (ref.current && ref.current.contains(event.target)) {
                    return;
                }
            }

            callback();
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [refs]);
}
