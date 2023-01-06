import { createApi, createEvent, createStore, sample } from "effector";
import { folderSelected } from "@/features/folders";
import { $letters, LetterState } from "../letters/model";
import { ThreeVariantState } from "@/entities/three-state-checkbox";

const letterOpened = createEvent<string>();
const letterClosed = createEvent();
const letterReadToggled = createEvent<void>();

const $currentLetter = createStore<LetterState | null>(null);
const $markIndicator = $currentLetter.map<ThreeVariantState>((letter) => {
    if (letter?.important) {
        return "second";
    }
    if (letter?.bookmark) {
        return "first";
    }
    return "unset";
});

const { importantSet, bookmarkSet, unset } = createApi($currentLetter, {
    importantSet: (letter) => letter && { ...letter, important: true },
    bookmarkSet: (letter) => letter && { ...letter, bookmark: true },
    unset: (letter) =>
        letter && { ...letter, bookmark: false, important: false },
});

sample({
    clock: letterOpened,
    source: $letters,
    fn: (letters, id) =>
        letters.data.find((letter) => letter.id === id) ?? null,
    target: $currentLetter,
});

$currentLetter.on(
    letterReadToggled,
    (state, _) =>
        state && {
            ...state,
            read: !state.read,
        }
);

sample({
    clock: $currentLetter,
    source: $letters,
    filter: (_, letter) => !!letter,
    fn: (letters, letter) => ({
        count: letters.count,
        data: letters.data.map((l) =>
            l.id === letter!.id ? { ...letter! } : l
        ),
    }),
    target: $letters,
});

$currentLetter.on([letterClosed, folderSelected], () => null);

export {
    $currentLetter,
    letterOpened,
    letterClosed,
    importantSet,
    bookmarkSet,
    unset,
    letterReadToggled,
    $markIndicator,
};
