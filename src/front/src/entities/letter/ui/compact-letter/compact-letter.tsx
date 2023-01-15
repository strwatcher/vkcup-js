import { useHover } from "@/shared/lib/hooks/use-hover";
import { useUnit } from "effector-react";
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
import { LetterState } from "../../lib";
import { useMemo, useRef } from "react";

export type CompactLetterProps = LetterState & {
  onSelectToggle: (id: string, selected: boolean) => void;
  onReadToggle: (id: string, read: boolean) => void;
  onMarkToggle: (id: string, state: ThreeVariantState) => void;
  onLetterClick: (id: string) => void;
  onAttachmentsOpened: (id: string) => void;
  onAttachmentsClosed: (id: string) => void;
};

export const CompactLetter = (props: CompactLetterProps) => {
  const { resources, flags } = useUnit({
    resources: $resources,
    flags: $flags,
  });

  const letterRef = useRef<HTMLDivElement>(null);
  const hovered = useHover(letterRef);

  const markImportantState: ThreeVariantState = useMemo(() => {
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
      hasAttachments={props.attachments}
      onClick={() => props.onLetterClick(props.id)}
    >
      <SimpleCheckbox
        hideActive
        hovered={hovered}
        checked={props.read}
        images={{
          checked: resources.read,
          unchecked: resources.unread,
        }}
        onChange={() => props.onReadToggle(props.id, props.read)}
      />

      <SelectableAvatar
        selected={props.selected}
        avatarImage={props.author.avatar ?? ""}
        images={{
          checked: resources.checkboxChecked,
          unchecked: resources.checkbox,
        }}
        onChange={() => props.onSelectToggle(props.id, props.selected)}
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
        onChange={(state) => props.onMarkToggle(props.id, state)}
      />

      <SlicedTitleContent
        title={props.title}
        text={props.text}
        read={props.read}
      />

      {props.flag && <img src={flags[props.flag]} />}

      {props.attachments && (
        <AttachmentsIndicator
          icon={resources.attachment}
          attachments={props.doc}
          opened={props.attachmentsOpened}
          onOpen={() => props.onAttachmentsOpened(props.id)}
          onClose={() => props.onAttachmentsClosed(props.id)}
        />
      )}

      <DateTimeIndicator date={props.date} />
    </CompactLetterLayout>
  );
};
