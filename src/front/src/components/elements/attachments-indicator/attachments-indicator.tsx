import React from "react";
import s from "./style.module.css";

export type AttachmentsIndicatorProps = {
  icon: string;
  attachments: any;
};

export const AttachmentsIndicator: React.FC<AttachmentsIndicatorProps> = (
  props
) => {
  return (
    <div className={s.attachmentIndicator}>
      <img src={props.icon} />
    </div>
  );
};
