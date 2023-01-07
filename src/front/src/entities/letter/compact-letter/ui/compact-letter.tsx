import React from "react";
import { useHover } from "@/shared/lib/hooks/use-hover";
import { useUnit } from "effector-react";
import {
  closeAttachments,
  LetterState,
  openAttachments,
} from "@/containers/letters/model";
import { SelectableAvatar } from "./selectable-avatar";
import { SlicedTitleContent } from "./sliced-title-content";
import { AttachmentsIndicator } from "./attachments-indicator";
import { DateTimeIndicator } from "./date-time-indicator";
import { CompactLetterLayout } from "./compact-letter-layout";
import {
  SimpleCheckbox,
  SlicedAuthor,
  ThreeStateCheckbox,
  ThreeVariantState,
} from "@/shared/ui";
import { $flags, $resources } from "@/shared/lib/theme";

export type CompactLetterProps = LetterState & {
  onSelect: (id: string) => void;
  onRead: (id: string) => void;
  onMarkImportant: (id: string, state: ThreeVariantState) => void;
  onOpen: (id: string) => void;
};

export const CompactLetter: React.FC<CompactLetterProps> = (props) => {
  const { resources, flags, onAttachmentsOpened, onAttachmentsClosed } =
    useUnit({
      resources: $resources,
      flags: $flags,
      onAttachmentsOpened: openAttachments,
      onAttachmentsClosed: closeAttachments,
    });

  const letterRef = React.useRef<HTMLDivElement>(null);
  const hovered = useHover(letterRef);

  const markImportantState: ThreeVariantState = React.useMemo(() => {
    if (props.important) return "second";
    if (props.bookmark) return "first";
    return "unset";
  }, [props.bookmark, props.important]);

  return (
    <CompactLetterLayout
      hoverRef={letterRef}
      read={props.read}
      selected={props.selected}
      hasFlag={!!props.flag}
      hasAttachments={!!props.doc}
      onClick={() => props.onOpen(props.id)}
    >
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

      {props.flag && <img src={flags[props.flag]} />}

      {props.doc && (
        <AttachmentsIndicator
          icon={resources.attachment}
          attachments={props.doc}
          opened={props.attachmentsOpened}
          onOpen={() => onAttachmentsOpened(props.id)}
          onClose={() => onAttachmentsClosed(props.id)}
        />
      )}

      <DateTimeIndicator date={props.date} />
    </CompactLetterLayout>
  );
};
