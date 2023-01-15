import { joinClasses } from "@/shared/lib/utils/join-classes";
import { ReactNode, RefObject, useMemo } from "react";
import s from "./style.module.scss";

export type CompactLetterLayoutProps = {
  children: ReactNode;
  selected: boolean;
  read: boolean;
  hoverRef: RefObject<HTMLDivElement>;
  hasAttachments: boolean;
  hasFlag: boolean;
  onClick: () => void;
};

export const CompactLetterLayout = (props: CompactLetterLayoutProps) => {
  const className = useMemo(() => {
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
