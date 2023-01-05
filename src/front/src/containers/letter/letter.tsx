import { useStore, useUnit } from "effector-react";
import React from "react";
import { LetterLayout } from "../../components/layouts/letter-layout";
import { Attachments } from "../../components/letter/attachments";
import { Body } from "../../components/letter/body";
import { Flag } from "../../components/letter/flag";
import { InfoControls } from "../../components/letter/info-controls";
import { Title } from "../../components/letter/title";
import { useHover } from "@/shared/lib/hooks/use-hover";
import {
    $currentLetter,
    $markIndicator,
    bookmarkSet,
    importantSet,
    letterReadToggled,
    unset,
} from "./model";
import { $flags } from "@/features/theme";

export const Letter: React.FC = () => {
    const { flags } = useUnit({
        flags: $flags,
    });

    const letterRef = React.useRef(null);
    const hovered = useHover(letterRef);

    const current = useStore($currentLetter)!;
    const markIndicator = useStore($markIndicator)!;

    const callbacks = {
        toggleRead: React.useCallback(() => {
            letterReadToggled();
        }, []),

        changeMarkIndicator: React.useCallback(() => {
            switch (markIndicator) {
            case "unset":
                bookmarkSet();
                break;
            case "first":
                importantSet();
                break;
            case "second":
                unset();
                break;
            }
        }, [markIndicator]),
    };

    return (
        <LetterLayout
            letterRef={letterRef}
            head={
                <>
                    <Title text={current.title} />
                    <Flag
                        name={current.flag}
                        icon={flags[current.flag]}
                    />
                </>
            }
            info={
                <InfoControls
                    read={current.read}
                    onReadChange={callbacks.toggleRead}
                    markIndicator={markIndicator}
                    onMarkIndicatorChange={callbacks.changeMarkIndicator}
                    sender={current.author}
                    to={current.to}
                    dateTime={current.date}
                    hovered={hovered}
                />
            }
            attachments={
                current.doc && <Attachments attachments={current.doc} />
            }
            text={<Body text={current.text} />}
        />
    );
};
