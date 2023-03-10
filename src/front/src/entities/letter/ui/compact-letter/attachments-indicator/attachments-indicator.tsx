import { IAttachments } from "shared/types/attachmets";
import { useClickOutside } from "@/shared/lib/hooks/use-click-outside";
import { List } from "@/shared/ui/list";
import { AttachmentItem } from "../attachment-item";
import s from "./style.module.scss";
import { useCallback, MouseEvent, useRef, useMemo } from "react";
import { joinClasses } from "@/shared/lib";
import { Spinner } from "@/shared/ui/spinner";

export type AttachmentsIndicatorProps = {
  icon: string;
  attachments?: IAttachments;
  opened: boolean;
  onOpen: () => void;
  onClose: () => void;
  attachmentsDown?: boolean;
  fetching: boolean;
};

export const AttachmentsIndicator = (props: AttachmentsIndicatorProps) => {
  const callbacks = {
    open: useCallback(
      (e: MouseEvent) => {
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

  const popupRef = useRef(null);
  const indicatorRef = useRef(null);

  useClickOutside(
    () => props.opened && props.onClose(),
    popupRef,
    indicatorRef
  );

  const attachments = useMemo(
    () =>
      props.attachments
        ? Array.from(Object.keys(props.attachments)).map((key, index) => ({
          id: `${index}`,
          name: key,
          bytes: props.attachments![key],
          down: props.attachmentsDown,
        }))
        : [],
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
        {props.fetching ? (
          <Spinner size="medium" />
        ) : (
          <List
            items={attachments}
            render={(props) => <AttachmentItem {...props} />}
          />
        )}
      </div>
    </div>
  );
};
