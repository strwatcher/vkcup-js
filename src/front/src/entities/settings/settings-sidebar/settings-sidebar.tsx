import { Button } from "@/shared/ui";
import { MouseEventHandler } from "react";
import { ISettingsPage } from "../settings-page";
import s from "./style.module.scss";

type SettingsSidebarProps = {
  openThemes: MouseEventHandler;
  openLanguage: MouseEventHandler;
  currentSettingsPage: ISettingsPage;
};

export const SettingsSidebar = (props: SettingsSidebarProps) => {
  return (
    <div className={s.settingsSidebar}>
      <Button
        variant="activated"
        textVariant="primary"
        onClick={props.openThemes}
        active={props.currentSettingsPage === "themes"}
      >
        Внешний вид
      </Button>
      <Button
        variant="activated"
        textVariant="primary"
        onClick={props.openLanguage}
        active={props.currentSettingsPage === "language"}
      >
        Язык
      </Button>
    </div>
  );
};
