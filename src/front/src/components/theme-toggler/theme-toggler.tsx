import s from "./style.module.css";

export type ThemeTogglerProps = {
  title: string;
  icon: string;
  toggle: () => void;
};

export const ThemeToggler: React.FC<ThemeTogglerProps> = (props) => {
  return (
    <div onClick={props.toggle} className={s.wrapper}>
      <img src={props.icon} />
      <span>{props.title}</span>
    </div>
  );
};
