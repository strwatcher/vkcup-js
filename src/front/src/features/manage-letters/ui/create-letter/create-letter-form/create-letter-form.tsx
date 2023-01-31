import { $$createLetter } from "@/features/manage-letters/model";
import { Input } from "@/shared/ui";
import { useUnit } from "effector-react";

export const CreateLetterForm = () => {
  const values = useUnit($$createLetter.$values);

  return (
    <div>
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
    </div>
  );
};
