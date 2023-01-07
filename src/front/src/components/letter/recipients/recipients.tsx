import React from "react";
import { IUser } from "shared";
import s from "./style.module.css";

export type RecipientsProps = {
    to: Array<IUser>;
};

export const Recipients: React.FC<RecipientsProps> = (props) => {
    const recipientsRule = React.useMemo(
        () => ({
            one: "получатель",
            few: "получателя",
            many: "получателей",
            other: "получателя",
        }),
        []
    );
    const { finalString, otherString } = React.useMemo(() => {
        const recipients = props.to
            .slice(0, 4)
            .map((user) => `${user.name} ${user.surname}`.trim());

        const finalString = `Кому: ${recipients.join(" ")}`;
        const recipientsLeft = props.to.length - 4;
        const recipientsKey = new Intl.PluralRules("ru-RU").select(
            recipientsLeft
        ) as "one" | "few" | "many" | "other";

        const otherString =
            recipientsLeft > 0
                ? `ещё ${recipientsLeft} ${recipientsRule[recipientsKey]}`
                : "";
        return { finalString, otherString };
    }, [props.to]);

    return (
        <div>
            {finalString} <u>{otherString}</u>
        </div>
    );
};
