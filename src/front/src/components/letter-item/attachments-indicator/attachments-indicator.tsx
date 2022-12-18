import React from "react";
import { IAttachments } from "shared/types/attachmets";
import { useClickOutside } from "../../../hooks/use-click-outside";
import { joinClasses } from "../../../utils/join-classes";
import { List } from "../../list";
import { AttachmentItem } from "../attachment-item";
import s from "./style.module.css";

export type AttachmentsIndicatorProps = {
  icon: string;
  attachments: IAttachments;
  opened: boolean;
  onToggle: () => void;
};

export const AttachmentsIndicator: React.FC<AttachmentsIndicatorProps> = (
  props
) => {
  const callbacks = {
    toggle: React.useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      props.onToggle();
    }, []),
  };

  const indicatorRef = React.useRef(null);
  const popupRef = React.useRef(null);

  useClickOutside(
    () => props.opened && props.onToggle(),
    popupRef,
    indicatorRef
  );

  const attachments = React.useMemo(
    () =>
      Array.from(Object.keys(props.attachments)).map((key) => ({
        name: key,
        bytes: props.attachments[key],
      })),
    [props.attachments]
  );

  return (
    <div
      className={joinClasses(s.attachmentIndicator, props.opened && s.active)}
    >
      <img
        ref={indicatorRef}
        src={props.icon}
        className={s.indicator}
        onClick={callbacks.toggle}
      />
      <div
        ref={popupRef}
        className={joinClasses(s.popup, !props.opened && s.closed)}
      >
        <List
          items={attachments}
          render={(props) => <AttachmentItem {...props} />}
        />
      </div>
    </div>
  );
};
