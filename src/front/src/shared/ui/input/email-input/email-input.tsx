import { joinClasses } from "@/shared/lib";
import { KeyboardEvent } from "react";
import { InputLayout } from "../input-layout";
import { BaseInputProps } from "../types";
import { EmailItem } from "./email-item";
import s from "./style.module.scss";

type EmailInputProps = BaseInputProps & {
  onChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (email: string) => void;
  value: string;
  addedEmails: Array<string>;
  invalid: boolean;
};

export const EmailInput = (props: EmailInputProps) => {
  const onAdd = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      props.onAdd();
    }
  };

  return (
    <InputLayout>
      <label className={s.label} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        id={props.id}
        className={joinClasses(
          s.emailInput,
          props.invalid && s.emailInputInvalid
        )}
        type={"email"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={onAdd}
      />
      {props.addedEmails.map((email) => (
        <EmailItem
          email={email}
          onRemove={() => props.onRemove(email)}
          key={email}
        />
      ))}
    </InputLayout>
  );
};
