import { base64Size, bToMb, joinClasses } from "@/shared/lib";
import s from "./style.module.scss";
import { ImagePreview } from "@/shared/ui";

export type IAttachmentItem = {
  name: string;
  bytes: string;
  down?: boolean;
};

export type AttachmentItemProps = IAttachmentItem;

export const AttachmentItem = (props: AttachmentItemProps) => {
  return (
    <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
      <img src={props.bytes} className={s.preview} />
      <span className={s.info}>
        {`${props.name}.jpg ${bToMb(base64Size(props.bytes)).toFixed(2)} MB`}
      </span>
      <div className={joinClasses(s.bigPreview, props.down && s.down)}>
        <ImagePreview {...props} />
      </div>
    </div>
  );
};
