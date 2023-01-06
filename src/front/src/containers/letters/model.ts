import { createApi, createEvent, createStore, sample } from "effector";
import { ILetter, ILetters } from "shared";
import { createRequest } from "@/shared/api/model";
import { v4 as uuid4 } from "uuid";
import { $selectedFolder } from "@/features/folders";

type RawLettersState = {
    data: ILetters;
    count: number;
};

export type LettersState = {
    data: Array<LetterState>;
    count: number;
};

export type LetterState = ILetter & {
    selected: boolean;
    id: string;
    attachmentsOpened: boolean;
};

const $letters = createStore<LettersState>({ data: [], count: 0 });
const $justFetched = createStore<boolean>(false);

const fetchLettersFx = createRequest({
    url: "letters/",
    fn: (letters: RawLettersState) => ({
        count: letters.count,
        data: letters.data.map((letter) => ({
            ...letter,
            selected: false,
            id: uuid4(),
            attachmentsOpened: false,
        })),
    }),
    target: $letters,
});

const $areLettersFetching = fetchLettersFx.pending;

sample({
    clock: $selectedFolder,
    fn: (clockData) => "?folder=" + clockData,
    target: fetchLettersFx,
});

sample({
    clock: fetchLettersFx.done,
    fn: () => true,
    target: $justFetched,
});

const scrolledUp = createEvent();

sample({
    clock: scrolledUp,
    fn: () => false,
    target: $justFetched,
});

const { letterSelectionToggled, letterReadToggled } = createApi($letters, {
    letterSelectionToggled: (letters, letterId) => ({
        count: letters.count,
        data: letters.data.map((letter) =>
            letter.id === letterId
                ? { ...letter, selected: !letter.selected }
                : letter
        ),
    }),
    letterReadToggled: (letters, letterId) => ({
        count: letters.count,
        data: letters.data.map((letter) =>
            letter.id === letterId ? { ...letter, read: !letter.read } : letter
        ),
    }),
});

const { letterImportantSet, letterBookmarkSet, letterUnset } = createApi(
    $letters,
    {
        letterImportantSet: (letters, letterId) => ({
            count: letters.count,
            data: letters.data.map((letter) =>
                letter.id === letterId ? { ...letter, important: true } : letter
            ),
        }),
        letterBookmarkSet: (letters, letterId) => ({
            count: letters.count,
            data: letters.data.map((letter) =>
                letter.id === letterId ? { ...letter, bookmark: true } : letter
            ),
        }),
        letterUnset: (letters, letterId) => ({
            count: letters.count,
            data: letters.data.map((letter) =>
                letter.id === letterId
                    ? { ...letter, bookmark: false, important: false }
                    : letter
            ),
        }),
    }
);

const { openAttachments, closeAttachments } = createApi($letters, {
    openAttachments: (letters, letterId) => ({
        count: letters.count,
        data: letters.data.map((letter) =>
            letter.id === letterId
                ? { ...letter, attachmentsOpened: true }
                : letter
        ),
    }),
    closeAttachments: (letters, letterId) => ({
        count: letters.count,
        data: letters.data.map((letter) =>
            letter.id === letterId
                ? { ...letter, attachmentsOpened: false }
                : letter
        ),
    }),
});

export {
    fetchLettersFx,
    $areLettersFetching,
    $letters,
    letterSelectionToggled,
    letterReadToggled,
    letterImportantSet,
    letterBookmarkSet,
    letterUnset,
    openAttachments,
    closeAttachments,
    $justFetched,
    scrolledUp,
};
