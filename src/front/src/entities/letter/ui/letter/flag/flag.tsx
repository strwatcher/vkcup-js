import s from "./style.module.scss";

export type FlagProps = {
  icon: string;
  name: string;
};

export const Flag = (props: FlagProps) => {
  return (
    <div className={s.flag}>
      <img src={props.icon} />
      <div>{props.name}</div>
    </div>
  );
};
