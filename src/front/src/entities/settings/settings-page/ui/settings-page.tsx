import { Box, Sign } from "@/shared/ui";
import { ReactNode } from "react";
import s from "./style.module.scss";

type SettingsPageProps = {
  children: ReactNode;
  head: string;
};
export const SettingsPage = (props: SettingsPageProps) => {
  return (
    <div className={s.settingsPage}>
      <Sign text={props.head} />
      <Box variant="vertical">{props.children}</Box>
    </div>
  );
};
