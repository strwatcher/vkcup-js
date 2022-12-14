import React from "react";
import { SimpleCheckbox } from "../../../containers/simple-checkbox";
import { SimpleCheckboxState } from "../../../containers/simple-checkbox/simple-checkbox";
import { joinClasses } from "../../../utils/join-classes";
import { Avatar } from "../avatar";
import s from "./style.module.css";

export type SelectableAvatarProps = {
  id: number;
  selected: boolean;
  avatarSrc: string;
  images: {
    [P in SimpleCheckboxState]: string;
  };
  onChange: (id: number) => void;
  hovered: boolean;
};

export const SelectableAvatar: React.FC<SelectableAvatarProps> = (props) => {
  const className = React.useMemo(() => {
    const selected = props.selected && s.selected;
    const hovered = props.hovered && s.hovered;

    return joinClasses(s.wrapper, selected, hovered);
  }, [props.selected, props.hovered]);

  return (
    <div className={className}>
      {!props.selected && (
        <div className={s.avatar}>
          <Avatar src={props.avatarSrc ?? ""} />
        </div>
      )}
      <div className={s.checkbox}>
        <SimpleCheckbox
          checked={props.selected}
          images={props.images}
          onChange={() => props.onChange(props.id)}
        />
      </div>
    </div>
  );
};
