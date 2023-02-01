import { InputLayout } from "../input-layout";
import { BaseInputProps } from "../types";
import s from "./style.module.scss";

type MultilineInputProps = BaseInputProps & {
  onChange: (value: string) => void;
  value: string;
};
export const MultilineInput = (props: MultilineInputProps) => {
  return (
    <InputLayout>
      <textarea
        className={s.input}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={"Текст письма..."}
      />
    </InputLayout>
  );
};
