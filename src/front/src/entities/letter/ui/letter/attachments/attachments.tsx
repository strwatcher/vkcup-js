import { IAttachments } from "shared/types/attachmets";
import { base64Size, bToMb } from "@/shared/lib/utils/base64-size";
import { ImagePreview } from "@/shared/ui";
import s from "./style.module.scss";
import { useMemo } from "react";

export type AttachmentsProps = {
  attachments: IAttachments;
};

export const Attachments = (props: AttachmentsProps) => {
  const fileRules = useMemo(
    () => ({
      one: "файл",
      few: "файла",
      many: "файлов",
      other: "файла",
    }),
    []
  );

  const attachments = useMemo(
    () =>
      props.attachments &&
      Array.from(Object.keys(props.attachments)).map((key) => ({
        name: key,
        bytes: props.attachments[key],
      })),
    [props.attachments]
  );

  const signs = useMemo(() => {
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
        {attachments?.map((doc, index) => (
          <ImagePreview {...doc} key={index} />
        ))}
      </div>

      <div className={s.info}>
        <span className={s.filesAmount}>{signs.amount}</span>
        <div className={s.download}>
          <a href={""} className={s.downloadLink}>
            Скачать
          </a>
          <span className={s.fileSize}>{signs.size}</span>
        </div>
      </div>
    </div>
  );
};
