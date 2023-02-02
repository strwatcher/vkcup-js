import { joinClasses } from "@/shared/lib";
import {
  DragEvent,
  DragEventHandler,
  ReactNode,
  RefObject,
  useMemo,
} from "react";
import s from "./style.module.scss";

export type CompactLetterLayoutProps = {
  children: ReactNode;
  selected: boolean;
  read: boolean;
  hoverRef: RefObject<HTMLDivElement>;
  hasAttachments: boolean;
  hasFlag: boolean;
  onClick: () => void;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
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

  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    console.log("started");
    props.onDragStart(e);
  };

  return (
    <div
      onClick={props.onClick}
      tabIndex={0}
      ref={props.hoverRef}
      className={className}
      draggable
      onDragStart={dragStartHandler}
    >
      {props.children}
    </div>
  );
};
