import { $$createLetter } from "@/features/manage-letters/model";
import { joinClasses } from "@/shared/lib";
import { useTranslate } from "@/shared/lib/language";
import {
  Button,
  EmailInput,
  FileInput,
  Input,
  MultilineInput,
} from "@/shared/ui";
import { useUnit } from "effector-react";
import { DragEvent, MouseEvent, useEffect, useRef, useState } from "react";
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

  const [dragStarted, setDragStarted] = useState(false);
  const dragAndDropStarterArea = useRef<HTMLDivElement>(null);
  const dragAndDropArea = useRef<HTMLDivElement>(null);

  const dragAreaEnter = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("started");
    setDragStarted(true);
  };

  const dragoverFiles = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
  };

  const dropFiles = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files.length) {
      $$createLetter.change.files(Array.from(e.dataTransfer.files));
    }
    setDragStarted(false);
  };

  const dragAreaLeave = (e: DragEvent<HTMLDivElement>) => {
    // e.stopPropagation();
    e.preventDefault();
    console.log("leave");
    setDragStarted(false);
  };

  useEffect(() => {
    const pasteFiles = (e: ClipboardEvent) => {
      if (e.clipboardData?.files.length) {
        e.preventDefault();
        $$createLetter.change.files(Array.from(e.clipboardData.files));
      }
    };

    document.addEventListener("paste", pasteFiles);

    return () => {
      document.removeEventListener("paste", pasteFiles);
    };
  }, []);

  return (
    <div
      className={s.createLetterForm}
      ref={dragAndDropStarterArea}
      onDragEnter={dragAreaEnter}
      onDragOver={dragoverFiles}
      onDrop={dropFiles}
    >
      {dragStarted && (
        <div
          className={s.dragAndDropArea}
          ref={dragAndDropArea}
          onDragLeave={dragAreaLeave}
        >
          {insertFiles}
        </div>
      )}
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
