import s from "./style.module.scss";

type EmailItemProps = {
  email: string;
  onRemove: () => void;
};

export const EmailItem = (props: EmailItemProps) => {
  return (
    <div className={s.emailItem} onClick={props.onRemove}>
      {props.email}
    </div>
  );
};
