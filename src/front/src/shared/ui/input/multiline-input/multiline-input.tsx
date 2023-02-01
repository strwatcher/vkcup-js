import { InputLayout } from "../input-layout";
import s from "./style.module.scss";

type MultilineInputProps = {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
};
export const MultilineInput = (props: MultilineInputProps) => {
  return (
    <InputLayout>
      <textarea
        className={s.input}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
      />
    </InputLayout>
  );
};
