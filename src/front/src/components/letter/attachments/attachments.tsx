import React from "react";
import { IAttachments } from "shared/types/attachmets";
import { base64Size, bToMb } from "@/shared/lib/utils/base64-size";
import s from "./style.module.css";
import { ImagePreview } from "@/shared/ui";

export type AttachmentsProps = {
  attachments: IAttachments;
};

export const Attachments: React.FC<AttachmentsProps> = (props) => {
  const fileRules = React.useMemo(
    () => ({
      one: "файл",
      few: "файла",
      many: "файлов",
      other: "файла",
    }),
    []
  );

  const attachments = React.useMemo(
    () =>
      props.attachments &&
      Array.from(Object.keys(props.attachments)).map((key) => ({
        name: key,
        bytes: props.attachments[key],
      })),
    [props.attachments]
  );

  const signs = React.useMemo(() => {
    const size = `(${bToMb(
      base64Size(attachments.map((a) => a.bytes).join(""))
    ).toFixed(2)}Mb)`;
    const amountKey = new Intl.PluralRules("ru-RU").select(
      attachments.length
    ) as "one" | "few" | "many" | "other";

    const amount = `${attachments.length} ${fileRules[amountKey]}`;
    return { amount, size };
  }, [attachments]);

  return (
    <div className={s.wrapper}>
      <div className={s.attachments}>
        {attachments?.map((doc) => (
          <ImagePreview {...doc} />
        ))}
      </div>

      <div className={s.info}>
        <span className={s.filesAmount}>{signs.amount}</span>
        <div className={s.download}>
          <a href={""} className={s.downloadLink}>
            Скачать
          </a>{" "}
          <span className={s.fileSize}>{signs.size}</span>
        </div>
      </div>
    </div>
  );
};
