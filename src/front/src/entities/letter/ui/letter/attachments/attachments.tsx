import { IAttachments } from "shared/types/attachmets";
import { ImagePreview } from "@/shared/ui";
import s from "./style.module.scss";
import { useMemo } from "react";
import { base64Size, bToMb } from "@/shared/lib";
import { usePluralTranslate, useTranslate } from "@/shared/lib/language";

export type AttachmentsProps = {
  attachments: IAttachments;
};

export const Attachments = (props: AttachmentsProps) => {
  const attachments = useMemo(
    () =>
      props.attachments &&
      Array.from(Object.keys(props.attachments)).map((key) => ({
        name: key,
        bytes: props.attachments[key],
      })),
    [props.attachments]
  );

  const { filesCount } = usePluralTranslate({
    filesCount: { key: "filesCount", plural: attachments.length },
  });

  const signs = useMemo(() => {
    const size = `(${bToMb(
      base64Size(attachments.map((a) => a.bytes).join(""))
    ).toFixed(2)}Mb)`;

    const amount = `${attachments.length} ${filesCount}`;
    return { amount, size };
  }, [attachments, filesCount]);

  const { download } = useTranslate({ download: "download" });

  return (
    <div className={s.wrapper}>
      <div className={s.attachments}>
        {attachments?.map((doc, index) => (
          <ImagePreview {...doc} key={index} />
        ))}
      </div>

      <div className={s.info}>
        <span className={s.filesAmount}>{signs.amount}</span>
        <div className={s.download}>
          <a href={""} className={s.downloadLink}>
            {download}
          </a>
          <span className={s.fileSize}>{signs.size}</span>
        </div>
      </div>
    </div>
  );
};
