import { memo } from "react";
import { AttachmentItem as pure } from "./attachment-item";

export const AttachmentItem = memo(pure);

export {
  type AttachmentItemProps,
  type IAttachmentItem,
} from "./attachment-item";
