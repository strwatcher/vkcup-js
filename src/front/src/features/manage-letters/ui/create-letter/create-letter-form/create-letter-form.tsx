import { $$createLetter } from "@/features/manage-letters/model";
import { useTranslate } from "@/shared/lib/language";
import {
  Button,
  EmailInput,
  FileInput,
  Input,
  MultilineInput,
} from "@/shared/ui";
import { useUnit } from "effector-react";
import s from "./style.module.scss";

export const CreateLetterForm = () => {
  const { values, attachments, addedRecipients, invalid } = useUnit({
    values: $$createLetter.$values,
    attachments: $$createLetter.$attachments,
    addedRecipients: $$createLetter.$to,
    invalid: $$createLetter.$recipientInvalid,
  });

  const { theme, to, text, send, insertFiles } = useTranslate({
    theme: "letterTheme",
    to: "recipient",
    text: "letterText",
    send: "send",
    insertFiles: "insertFiles",
  });

  return (
    <div className={s.createLetterForm}>
      <Input
        id={"letterTitle"}
        type="text"
        value={values.title}
        onChange={$$createLetter.change.title}
        label={theme}
      />
      <EmailInput
        id={"letterHeader"}
        value={values.currentRecipient}
        onChange={$$createLetter.change.currentRecipient}
        label={to}
        onAdd={$$createLetter.addRecipient}
        onRemove={$$createLetter.removeRecipient}
        addedEmails={addedRecipients}
        invalid={invalid}
      />

      <FileInput
        id={"img"}
        label={insertFiles}
        onChange={(e) =>
          $$createLetter.change.files(
            e.target.files ? Array.from(e.target.files) : []
          )
        }
        onRemove={$$createLetter.removeAttachment}
        value={attachments ?? {}}
        multiple
      />

      <MultilineInput
        placeholder={text}
        value={values.text}
        onChange={$$createLetter.change.text}
      />

      <Button variant="accent" onClick={() => $$createLetter.submit()}>
        {send}
      </Button>
    </div>
  );
};
