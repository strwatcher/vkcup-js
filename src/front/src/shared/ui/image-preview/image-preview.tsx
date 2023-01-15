import { $resources } from "@/shared/lib/theme";
import { useStore } from "effector-react";
import s from "./style.module.scss";

export type BigPreviewProps = {
  name: string;
  bytes: string;
};

export const ImagePreview = (props: BigPreviewProps) => {
  const resources = useStore($resources);

  return (
    <a
      className={s.bigPreview}
      href={props.bytes}
      download={`${props.name}.jpg`}
    >
      <img src={props.bytes} />
      <div className={s.download}>
        <img src={resources.download} />
        <span>Скачать</span>
      </div>
    </a>
  );
};
