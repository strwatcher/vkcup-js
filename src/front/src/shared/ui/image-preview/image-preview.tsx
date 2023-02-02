import { joinClasses } from "@/shared/lib";
import { useTranslate } from "@/shared/lib/language";
import { $resources } from "@/shared/lib/theme";
import { useStore } from "effector-react";
import s from "./style.module.scss";

export type ImagePreviewProps = {
  name: string;
  bytes: string;
  type: "big" | "heightBased";
  onClick?: () => void;
};

export const ImagePreview = (props: ImagePreviewProps) => {
  const resources = useStore($resources);
  const { download } = useTranslate({ download: "download" });

  if (props.type === "big")
    return (
      <a
        className={joinClasses(s.imagePreview, s.big)}
        href={props.bytes}
        download={`${props.name}.jpg`}
      >
        <img src={props.bytes} />
        <div className={s.download}>
          <img src={resources.download} />
          <span>{download}</span>
        </div>
      </a>
    );

  return (
    <div
      className={joinClasses(s.imagePreview, s.heightBased)}
      onClick={props.onClick}
    >
      <img src={props.bytes} />
    </div>
  );
};

ImagePreview.defaultProps = {
  type: "big",
};
