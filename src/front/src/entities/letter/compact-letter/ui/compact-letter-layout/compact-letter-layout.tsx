import { joinClasses } from "@/shared/lib/utils/join-classes";
import React, { RefObject } from "react";
import s from "./style.module.css";

export type CompactLetterLayoutProps = {
  children: React.ReactNode;
  selected: boolean;
  read: boolean;
  hoverRef: RefObject<HTMLDivElement>;
  hasAttachments: boolean;
  hasFlag: boolean;
  onClick: () => void;
};

export const CompactLetterLayout: React.FC<CompactLetterLayoutProps> = (
  props
) => {
  const className = React.useMemo(() => {
    return joinClasses(
      s.letter,
      props.read && s.read,
      props.selected && s.selected,
      props.hasAttachments && s.hasAttachments,
      props.hasFlag && s.hasFlag
    );
  }, [props.read, props.selected, props.hasAttachments, props.hasFlag]);

  return (
    <div
      onClick={props.onClick}
      tabIndex={0}
      ref={props.hoverRef}
      className={className}
    >
      {props.children}
    </div>
  );
};
