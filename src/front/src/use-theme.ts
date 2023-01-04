import React from "react";
import { useStore } from "effector-react";
import {
    $flags,
    $resources,
    $theme,
    $themeSize,
    eventToggleTheme,
    windowWidthChanged,
} from "./services/theme/theme";

export function useTheme() {
    const resources = useStore($resources);
    const size = useStore($themeSize);
    const flags = useStore($flags);

    const toggle = eventToggleTheme;

    const handleWindowResize = React.useCallback(() => {
        windowWidthChanged(window.innerWidth);
    }, []);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return { size, resources, flags, toggle };
}
