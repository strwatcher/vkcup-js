import React from "react";
import { LetterState } from "../../containers/letters/model";
import { useHover } from "../../hooks/use-hover";
import { useTheme } from "../../hooks/use-theme";
import { genUrl } from "../../services/api/model";
import { AttachmentsIndicator } from "../elements/attachments-indicator";
import { FlagIndicator } from "../elements/flag-indicator";
import { SelectableAvatar } from "../elements/selectable-avatar";
import { SimpleCheckbox } from "../elements/simple-checbox";
import { SlicedAuthor } from "../elements/sliced-author";
import { SlicedTitleContent } from "../elements/sliced-title-content";
import {
  ThreeStateCheckbox,
  ThreeVariantState,
} from "../elements/three-state-checkbox";
import { LetterItemLayout } from "../layouts/letter-item-layout";

export type LetterProps = LetterState & {
  onSelect: (id: number) => void;
  onRead: (id: number) => void;
  onMarkImportant: (id: number, state: ThreeVariantState) => void;
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
      hasAttachments={!!props.doc}
    >
      <SimpleCheckbox
        checked={props.read}
        images={images.readCheckboxImages}
        onChange={() => props.onRead(props.id)}
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

      {props.flag && <FlagIndicator icon={genUrl(flags[props.flag])} />}
      {props.doc && (
        <AttachmentsIndicator
          icon={genUrl(resources.attachment)}
          attachments={props.doc}
        />
      )}
    </LetterItemLayout>
  );
};
