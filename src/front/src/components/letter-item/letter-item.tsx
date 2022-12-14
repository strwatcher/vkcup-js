import React from "react";
import { LetterState } from "../../containers/letters/model";
import { SimpleCheckbox } from "../../containers/simple-checkbox";
import { useHover } from "../../hooks/use-hover";
import { useTheme } from "../../hooks/use-theme";
import { SelectableAvatar } from "../elements/selectable-avatar";
import { SlicedTitleContent } from "../elements/sliced-title-content";
import { LetterItemLayout } from "../layouts/letter-item-layout";
import s from "./style.module.css";
export type LetterProps = LetterState & {
  onSelect: (id: number) => void;
  onRead: (id: number) => void;
};

export const LetterItem: React.FC<LetterProps> = (props) => {
  const { resources } = useTheme();
  const letterRef = React.useRef<HTMLDivElement>(null);

  const hovered = useHover(letterRef);
  const date = new Date(props.date);
  const time = `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <LetterItemLayout
      hoverRef={letterRef}
      read={props.read}
      selected={props.selected}
    >
      <SimpleCheckbox
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
        avatarSrc={props.author.avatar ?? ""}
        images={{
          checked: resources.checkboxChecked,
          unchecked: resources.checkbox,
        }}
        onChange={props.onSelect}
        hovered={hovered}
      />
      <span className={s.author}>
        {props.author.name} {props.author.surname}
      </span>
      <SlicedTitleContent
        title={props.title}
        text={props.text}
        read={props.read}
      />
      <span className={s.time}>{time}</span>
    </LetterItemLayout>
  );
};
