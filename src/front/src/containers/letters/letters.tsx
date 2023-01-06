import { useStore } from "effector-react";
import React, { useRef } from "react";
import { useScrollTop } from "@/shared/lib/hooks/use-scroll-top";
import { LetterItem } from "../letter-item";
import { letterOpened } from "../letter/model";
import {
    $letters,
    LetterState,
    letterSelectionToggled,
    letterReadToggled,
    letterImportantSet,
    letterUnset,
    letterBookmarkSet,
    closeAttachments,
    openAttachments,
    $justFetched,
    scrolledUp,
    $areLettersFetching,
} from "./model";
import { List } from "@/shared/ui";
import { ThreeVariantState } from "@/entities/three-state-checkbox";

export const Letters: React.FC = () => {
    const stores = {
        letters: useStore($letters),
        justFetched: useStore($justFetched),
        fetching: useStore($areLettersFetching),
    };
    const callbacks = {
        onSelect: React.useCallback((id: string) => {
            letterSelectionToggled(id);
        }, []),
        onRead: React.useCallback((id: string) => {
            letterReadToggled(id);
        }, []),
        onMarkImportant: React.useCallback(
            (id: string, state: ThreeVariantState) => {
                const actionMap = {
                    unset: letterBookmarkSet,
                    first: letterImportantSet,
                    second: letterUnset,
                };
                actionMap[state](id);
            },
            []
        ),
        onToggleAttachments: React.useCallback(
            (id: string, opened: boolean) => {
                opened ? closeAttachments(id) : openAttachments(id);
            },
            []
        ),

        onOpenLetter: React.useCallback((id: string) => {
            letterOpened(id);
        }, []),
    };

    const renders = {
        letter: React.useCallback(
            (letter: LetterState) => (
                <LetterItem
                    {...letter}
                    onSelect={callbacks.onSelect}
                    onRead={callbacks.onRead}
                    onMarkImportant={callbacks.onMarkImportant}
                    onToggleAttachments={callbacks.onToggleAttachments}
                    onOpen={callbacks.onOpenLetter}
                />
            ),
            []
        ),
    };

    const scrollRef = useRef(null);

    useScrollTop(
        () => {
            scrolledUp();
        },
        scrollRef,
        stores.justFetched
    );

    return (
        <div ref={scrollRef}>
            {!stores.fetching && (
                <List
                    render={renders.letter}
                    items={stores.letters.data}
                />
            )}
        </div>
    );
};
