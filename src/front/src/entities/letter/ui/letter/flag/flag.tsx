import { IFlag } from "shared";
import { useTranslate } from "@/shared/lib/language";
import s from "./style.module.scss";

export type FlagProps = {
  icon: string;
  name: IFlag;
};

export const Flag = (props: FlagProps) => {
  const { flagName } = useTranslate({ flagName: props.name });
  return (
    <div className={s.flag}>
      <img src={props.icon} />
      <div>{flagName}</div>
    </div>
  );
};
