import React from "react";
import { useHover } from "@/shared/lib/hooks/use-hover";
import { useUnit } from "effector-react";
import { $flags, $resources } from "@/features/theme";
import {
    ThreeStateCheckbox,
    ThreeVariantState,
} from "@/entities/three-state-checkbox";
import { SimpleCheckbox } from "@/entities/simple-checkbox";
import { LetterState } from "@/containers/letters/model";
import { LetterItemLayout } from "@/components/layouts/letter-item-layout";
import { SelectableAvatar } from "./selectable-avatar";
import { SlicedAuthor } from "@/components/letter-item/sliced-author";
import { SlicedTitleContent } from "@/components/letter-item/sliced-title-content";
import { FlagIndicator } from "@/components/letter-item/flag-indicator";
import { AttachmentsIndicator } from "@/components/letter-item/attachments-indicator";
import { DateTimeIndicator } from "@/components/letter-item/date-time-indicator";

export type LetterProps = LetterState & {
    onSelect: (id: string) => void;
    onRead: (id: string) => void;
    onMarkImportant: (id: string, state: ThreeVariantState) => void;
    onToggleAttachments: (id: string, opened: boolean) => void;
    onOpen: (id: string) => void;
};

export const LetterItem: React.FC<LetterProps> = (props) => {
    const { resources, flags } = useUnit({
        resources: $resources,
        flags: $flags,
    });

    const letterRef = React.useRef<HTMLDivElement>(null);
    const hovered = useHover(letterRef);

    const markImportantState: ThreeVariantState = React.useMemo(() => {
        if (props.important) return "second";
        if (props.bookmark) return "first";
        return "unset";
    }, [props.bookmark, props.important]);

    return (
        <LetterItemLayout
            hoverRef={letterRef}
            read={props.read}
            selected={props.selected}
            hasFlag={!!props.flag}
            hasAttachments={!!props.doc}
            onClick={() => props.onOpen(props.id)}>
            <SimpleCheckbox
                hideActive
                hovered={hovered}
                checked={props.read}
                images={{
                    checked: resources.read,
                    unchecked: resources.unread,
                }}
                onChange={() => props.onRead(props.id)}
            />

            <SelectableAvatar
                id={props.id}
                selected={props.selected}
                avatarImage={props.author.avatar ?? ""}
                images={{
                    checked: resources.checkboxChecked,
                    unchecked: resources.checkbox,
                }}
                onChange={props.onSelect}
                hovered={hovered}
            />

            <SlicedAuthor
                name={props.author.name}
                surname={props.author.surname}
                read={props.read}
            />

            <ThreeStateCheckbox
                hovered={hovered}
                state={markImportantState}
                images={{
                    unset: resources.unmarked,
                    first: resources.marked,
                    second: resources.exclamation,
                }}
                onChange={(state) => props.onMarkImportant(props.id, state)}
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
