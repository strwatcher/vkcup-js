import { joinClasses } from "@/shared/lib";
import { useTranslate } from "@/shared/lib/language";
import { $resources } from "@/shared/lib/theme";
import { useStore } from "effector-react";
import s from "./style.module.scss";

export type ImagePreviewProps = {
  name: string;
  bytes: string;
  type: "big" | "heightBased";
};

export const ImagePreview = (props: ImagePreviewProps) => {
  const resources = useStore($resources);
  const { download } = useTranslate({ download: "download" });
  return (
    <a
      className={joinClasses(s.imagePreview, s[props.type])}
      href={props.bytes}
      download={`${props.name}.jpg`}
    >
      <img src={props.bytes} />
      {props.type === "big" && (
        <div className={s.download}>
          <img src={resources.download} />
          <span>{download}</span>
        </div>
      )}
    </a>
  );
};

ImagePreview.defaultProps = {
  type: "big",
};
