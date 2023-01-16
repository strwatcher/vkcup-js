import { IScreenSize } from "@/shared/lib/screen-size";
import { Button } from "@/shared/ui";
import s from "./style.module.scss";
import { useStoreMap } from "effector-react";
import { $resources } from "@/shared/lib/theme";
import { useTranslate } from "@/shared/lib/language";

export type ControlSettingsProps = {
  toggle: () => void;
  variant: IScreenSize;
};

export const ControlSettings = (props: ControlSettingsProps) => {
  const { settings } = useTranslate({ settings: "settings" });
  const icon = useStoreMap($resources, (resources) => resources.gear);
  return (
    <Button onClick={props.toggle} variant={"sidebarButton"}>
      <img src={icon} />
      {props.variant === "big" && (
        <span className={s.themeText}>{settings}</span>
      )}
    </Button>
  );
};
