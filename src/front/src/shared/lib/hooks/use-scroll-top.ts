import React from "react";

export function useScrollTop<T extends HTMLElement>(
    callback: () => void,
    scroll: boolean
) {
    const scrollTop = React.useCallback(
        (node: T | null) => {
            if (scroll && node) {
                callback();
                node.scrollTo(0, 0);
            }
        },
        [scroll]
    );
    return scrollTop;
}
