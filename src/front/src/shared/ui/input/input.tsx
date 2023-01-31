import { joinClasses } from "@/shared/lib";
import { ChangeEvent } from "react";
import s from "./style.module.scss";

type InputProps = {
  type: "text" | "email";
  onChange: (value: string) => void;
  value: string;
  label: string;
  id: string;
};
export const Input = (props: InputProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };
  return (
    <div className={s.container}>
      <label className={s.label} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        id={props.id}
        className={joinClasses(s.input, s[props.type])}
        type={props.type}
        value={props.value}
        onChange={onChange}
      />
    </div>
  );
};
