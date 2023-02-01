import { $$createLetter } from "@/features/manage-letters/model";
import { Button, FileInput, Input, MultilineInput } from "@/shared/ui";
import { useUnit } from "effector-react";
import s from "./style.module.scss";

export const CreateLetterForm = () => {
  const values = useUnit($$createLetter.$values);

  const attachments = useUnit($$createLetter.$attachments);
  return (
    <div className={s.createLetterForm}>
      <Input
        id={"letterHeader"}
        type="text"
        value={values.header}
        onChange={$$createLetter.change.header}
        label={"Тема"}
      />
      <Input
        id={"letterHeader"}
        type="email"
        value={values.currentRecipient}
        onChange={$$createLetter.change.currentRecipient}
        label={"Кому"}
      />

      <FileInput
        id={"img"}
        label={"Вложить файлы"}
        onChange={(e) =>
          $$createLetter.change.files(
            e.target.files ? Array.from(e.target.files) : []
          )
        }
        value={attachments}
        multiple
      />

      <MultilineInput
        value={values.body}
        onChange={$$createLetter.change.body}
      />

      <Button variant="accent">{"Отправить"}</Button>
    </div>
  );
};
