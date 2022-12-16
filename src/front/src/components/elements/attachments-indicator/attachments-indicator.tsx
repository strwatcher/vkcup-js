import React from "react";
import { useClickOutside } from "../../../hooks/use-click-outside";
import { joinClasses } from "../../../utils/join-classes";
import { List } from "../../list";
import { AttachmentItem, IAttachmentItem } from "../attachment-item";
import s from "./style.module.css";

export type AttachmentsIndicatorProps = {
  icon: string;
  attachments: any;
  opened: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export const AttachmentsIndicator: React.FC<AttachmentsIndicatorProps> = (
  props
) => {
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
        onClick={props.onToggle}
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
