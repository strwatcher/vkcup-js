import React, { RefObject } from "react";
import { joinClasses } from "../../../utils/join-classes";
import s from "./style.module.css";

export type LetterItemLayoutProps = {
  children: React.ReactNode;
  selected: boolean;
  read: boolean;
  hoverRef: RefObject<HTMLDivElement>;
  hasAttachments: boolean;
  hasFlag: boolean;
};

export const LetterItemLayout: React.FC<LetterItemLayoutProps> = (props) => {
  const className = React.useMemo(() => {
    return joinClasses(
      s.letter,
      props.read && s.read,
      props.selected && s.selected,
      props.hasAttachments && s.hasAttachments,
      props.hasFlag && s.hasFlag
    );
  }, [props.read, props.selected]);

  return (
    <div tabIndex={0} ref={props.hoverRef} className={className}>
      {props.children}
    </div>
  );
};
