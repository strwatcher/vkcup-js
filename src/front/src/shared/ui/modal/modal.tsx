import { ReactNode } from "react";
import s from "./style.module.scss";

type ModalProps = {
  children: ReactNode;
  active: boolean;
  onClose: () => void;
};
export const Modal = (props: ModalProps) => {
  if (!props.active) return null;

  return (
    <>
      <div className={s.modalScreen} onClick={props.onClose}></div>
      <div className={s.modal}>{props.children}</div>
    </>
  );
};
