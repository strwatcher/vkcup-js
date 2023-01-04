import React from "react";
import { ReadIndicator } from "../../components/elements/read-indicator";
import {
    ThreeStateCheckbox,
    ThreeVariantState,
} from "../../components/elements/three-state-checkbox";
import { LetterItemLayout } from "../../components/layouts/letter-item-layout";
import { AttachmentsIndicator } from "../../components/letter-item/attachments-indicator";
import { DateTimeIndicator } from "../../components/letter-item/date-time-indicator";
import { FlagIndicator } from "../../components/letter-item/flag-indicator";
import { SelectableAvatar } from "../../components/letter-item/selectable-avatar";
import { SlicedAuthor } from "../../components/letter-item/sliced-author";
import { SlicedTitleContent } from "../../components/letter-item/sliced-title-content";
import { LetterState } from "../../containers/letters/model";
import { useHover } from "@/shared/lib/hooks/use-hover";
import { useTheme } from "../../hooks/use-theme";

export type LetterProps = LetterState & {
    onSelect: (id: string) => void;
    onRead: (id: string) => void;
    onMarkImportant: (id: string, state: ThreeVariantState) => void;
    onToggleAttachments: (id: string, opened: boolean) => void;
    onOpen: (id: string) => void;
};

export const LetterItem: React.FC<LetterProps> = (props) => {
    const { resources, flags } = useTheme();
    const letterRef = React.useRef<HTMLDivElement>(null);

    const hovered = useHover(letterRef);

    const markImportantState: ThreeVariantState = React.useMemo(() => {
        if (props.important) return "second";
        if (props.bookmark) return "first";
        return "unset";
    }, [props.bookmark, props.important]);

    const images = {
        readCheckboxImages: React.useMemo(
            () => ({
                checked: resources.read,
                unchecked: resources.unread,
            }),
            [resources]
        ),

        selectCheckboxImages: React.useMemo(
            () => ({
                checked: resources.checkboxChecked,
                unchecked: resources.checkbox,
            }),
            [resources]
        ),

        markImportantCheckboxImages: React.useMemo(
            () => ({
                unset: resources.unmarked,
                first: resources.marked,
                second: resources.exclamation,
            }),
            [resources]
        ),
    };

    return (
        <LetterItemLayout
            hoverRef={letterRef}
            read={props.read}
            selected={props.selected}
            hasFlag={!!props.flag}
            hasAttachments={!!props.doc}
            onClick={() => props.onOpen(props.id)}>
            <ReadIndicator
                read={props.read}
                onChange={() => props.onRead(props.id)}
                hovered={hovered}
            />

            <SelectableAvatar
                id={props.id}
                selected={props.selected}
                avatarSrc={props.author.avatar ?? ""}
                images={images.selectCheckboxImages}
                onChange={props.onSelect}
                hovered={hovered}
            />

            <SlicedAuthor
                name={props.author.name}
                surname={props.author.surname}
                read={props.read}
            />

            <ThreeStateCheckbox
                state={markImportantState}
                images={images.markImportantCheckboxImages}
                onChange={(state) => props.onMarkImportant(props.id, state)}
                hovered={hovered}
            />

            <SlicedTitleContent
                title={props.title}
                text={props.text}
                read={props.read}
            />

            {props.flag && <FlagIndicator icon={flags[props.flag]} />}
            {props.doc && (
                <AttachmentsIndicator
                    icon={resources.attachment}
                    attachments={props.doc}
                    opened={props.attachmentsOpened}
                    onToggle={() =>
                        props.onToggleAttachments(
                            props.id,
                            props.attachmentsOpened
                        )
                    }
                />
            )}
            <DateTimeIndicator date={props.date} />
        </LetterItemLayout>
    );
};
