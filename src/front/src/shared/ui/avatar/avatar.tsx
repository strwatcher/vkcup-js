import s from "./style.module.scss";

export type AvatarProps = {
  src?: string;
};

export const Avatar = (props: AvatarProps) => {
  return props.src ? (
    <img className={s.avatar} src={props.src} />
  ) : (
    <div className={s.avatar}></div>
  );
};
