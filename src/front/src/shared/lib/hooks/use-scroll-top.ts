import React, { RefObject } from "react";

export function useScrollTop(
    callback: () => void,
    ref: RefObject<HTMLElement>,
    scroll: boolean
) {
    React.useLayoutEffect(() => {
        if (scroll) {
            callback();
            ref.current?.scrollTo(0, 0);
        }
    }, [scroll]);
}
