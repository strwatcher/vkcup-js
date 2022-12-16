import React from "react";
import { base64Size, bToMb } from "../../../utils/base64-size";
import s from "./style.module.css";

export type IAttachmentItem = {
  name: string;
  bytes: string;
};

export type AttachmentItemProps = IAttachmentItem;

export const AttachmentItem: React.FC<AttachmentItemProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <img src={props.bytes} className={s.preview} />
      <span className={s.info}>
        {`${props.name}.jpg ${bToMb(base64Size(props.bytes)).toFixed(2)} MB`}
      </span>
    </div>
  );
};
