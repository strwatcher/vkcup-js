import { ChangeEvent } from "react";
import { BaseInputProps } from "../types";
import s from "./style.module.scss";
import { IAttachments } from "shared/types/attachmets";
import { List } from "../../list";
import { ImagePreview } from "../../image-preview";

type FileInputProps = BaseInputProps & {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  value: IAttachments;
};
export const FileInput = (props: FileInputProps) => {
  const files = props.value
    ? Object.entries(props.value).map(([k, v], index) => ({
      id: `${index}`,
      name: k,
      bytes: v,
    }))
    : [];

  return (
    <>
      <div className={s.container}>
        <input
          id={props.id}
          className={s.input}
          type={"file"}
          accept={"image/*"}
          onChange={props.onChange}
          multiple={props.multiple}
          value={""}
        />
        <label className={s.label} htmlFor={props.id} tabIndex={1}>
          {props.label}
        </label>
      </div>
      {files.length ? (
        <div className={s.filePreview}>
          <List
            items={files}
            render={(file) => <ImagePreview {...file} type={"heightBased"} />}
            direction={"horizontal"}
          />
        </div>
      ) : null}
    </>
  );
};
