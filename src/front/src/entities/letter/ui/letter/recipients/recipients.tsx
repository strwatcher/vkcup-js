import { usePluralTranslate, useTranslate } from "@/shared/lib/language";
import { useMemo } from "react";
import { IUser } from "shared";

export type RecipientsProps = {
  to: Array<IUser>;
};

export const Recipients = (props: RecipientsProps) => {
  const { recipientSign, another } = useTranslate({
    recipientSign: "recipient",
    another: "another",
  });

  const visibleRecipients = useMemo(() => {
    const recipients = props.to
      .slice(0, 4)
      .map((user) => `${user.name} ${user.surname}`.trim());

    const result = `${recipientSign}: ${recipients.join(", ")}`;
    return result;
  }, [props.to, another]);

  const recipientsLeft = useMemo(() => props.to.length - 4, [props.to.length]);
  const { recipientsPlural } = usePluralTranslate({
    recipientsPlural: { key: "recipients", plural: recipientsLeft },
  });

  const anotherRecipients = useMemo(
    () =>
      recipientsLeft > 0
        ? `${another} ${recipientsLeft} ${recipientsPlural}`
        : "",
    [another, recipientsLeft, recipientsPlural]
  );

  return (
    <div>
      {visibleRecipients} <u>{anotherRecipients}</u>
    </div>
  );
};
