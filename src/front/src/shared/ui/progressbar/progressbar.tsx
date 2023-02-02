import s from "./style.module.scss";

export const Progressbar = () => {
  return (
    <div className={s.progressbarContainer}>
      <div className={s.progressbar} />
    </div>
  );
};
