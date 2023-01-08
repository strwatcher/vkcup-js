import React from "react";
import { IAttachments } from "shared/types/attachmets";
import { useClickOutside } from "@/shared/lib/hooks/use-click-outside";
import { List } from "@/shared/ui/list";
import { AttachmentItem } from "../attachment-item";
import s from "./style.module.css";
import { joinClasses } from "@/shared/lib/utils/join-classes";

export type AttachmentsIndicatorProps = {
  icon: string;
  attachments: IAttachments;
  opened: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const AttachmentsIndicator: React.FC<AttachmentsIndicatorProps> = (
  props
) => {
  const callbacks = {
    open: React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!props.opened) {
          props.onOpen();
        } else {
          props.onClose();
        }
      },
      [props.onOpen, props.opened]
    ),
  };

  const popupRef = React.useRef(null);
  const indicatorRef = React.useRef(null);

  useClickOutside(
    () => props.opened && props.onClose(),
    popupRef,
    indicatorRef
  );

  const attachments = React.useMemo(
    () =>
      Array.from(Object.keys(props.attachments)).map((key, index) => ({
        id: `${index}`,
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
        onClick={callbacks.open}
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
