import React, { RefObject } from "react";

export function useHover(ref: RefObject<HTMLElement>) {
    const [hover, setHover] = React.useState(false);
    const onMouseOver = React.useCallback(() => {
        setHover(true);
    }, []);
    const onMouseOut = React.useCallback(() => {
        setHover(false);
    }, []);

    React.useEffect(() => {
        ref.current?.addEventListener("mouseover", onMouseOver);
        ref.current?.addEventListener("mouseout", onMouseOut);

        return () => {
            ref.current?.removeEventListener("mouseover", onMouseOver);
            ref.current?.removeEventListener("mouseout", onMouseOut);
        };
    }, [ref.current]);

    return hover;
}
