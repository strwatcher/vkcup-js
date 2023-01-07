import React from "react";
import { IUser } from "shared";
import { Info } from "./info";
import s from "./style.module.css";
import { useUnit } from "effector-react";
import { $resources } from "@/features/theme";
import { SimpleCheckbox, ThreeVariantState } from "@/shared/ui";

export type InfoControlsProps = {
    read: boolean;
    markIndicator: ThreeVariantState;
    onMarkIndicatorChange: () => void;
    sender: IUser;
    to: Array<IUser>;
    dateTime: string;
    onReadChange: () => void;
    hovered: boolean;
};

export const InfoControls: React.FC<InfoControlsProps> = (props) => {
    const resources = useUnit($resources);
    return (
        <div className={s.infoControls}>
            <SimpleCheckbox
                onChange={props.onReadChange}
                checked={props.read}
                images={{
                    checked: resources.read,
                    unchecked: resources.unread,
                }}
            />
            <Info
                hovered={props.hovered}
                author={props.sender}
                to={props.to}
                dateTime={props.dateTime}
                indicator={props.markIndicator}
                onChange={props.onMarkIndicatorChange}
            />
        </div>
    );
};
