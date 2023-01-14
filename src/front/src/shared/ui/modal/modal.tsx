import React, { MouseEventHandler } from "react";
import s from "./style.module.scss";

type ModalProps = {
  children: React.ReactNode;
  opened: boolean;
  onClose: MouseEventHandler;
};
export const Modal = (props: ModalProps) => {
  if (!props.opened) return null;

  return (
    <>
      <div className={s.modalScreen} onClick={props.onClose}></div>
      <div className={s.modal}>{props.children}</div>
    </>
  );
};
