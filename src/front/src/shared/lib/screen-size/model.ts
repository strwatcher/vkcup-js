import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

export type IScreenSize = "small" | "big";

const getCurrentSize = () =>
    matchMedia("(max-width: 768px)").matches ? "small" : "big";

const screenResized = createEvent<IScreenSize>();
const handleScreenResize = () => {
    screenResized(getCurrentSize());
};

const subscribeToResizeFx = createEffect(() => {
    window.addEventListener("resize", handleScreenResize);
});

const unsubscribeFromResizeFx = createEffect(() => {
    window.removeEventListener("resize", handleScreenResize);
});

const $screenSize = createStore<IScreenSize>(getCurrentSize());
const ScreenSizeGate = createGate();

sample({ clock: ScreenSizeGate.open, target: subscribeToResizeFx });
sample({ clock: ScreenSizeGate.close, target: unsubscribeFromResizeFx });

sample({
    source: screenResized,
    target: $screenSize,
});

export { ScreenSizeGate, $screenSize };
