import { joinClasses } from "@/shared/lib";
import { useCallback } from "react";
import s from "./style.module.scss";

type SeparatorProps = {
  size: number;
  thickness: number;
  direction: "vertical" | "horizontal";
};

export const Separator = (props: SeparatorProps) => {
  const setSize = useCallback(
    (node: HTMLDivElement | null) => {
      node?.style.setProperty("--size", props.size + "px");
      node?.style.setProperty("--thickness", props.thickness + "px");
    },
    [props.size, props.thickness]
  );

  return (
    <div
      ref={setSize}
      className={joinClasses(s.separator, s[props.direction])}
    />
  );
};
