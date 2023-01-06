import {
    ThreeStateCheckbox,
    ThreeVariantState,
} from "@/entities/three-state-checkbox";
import { $resources } from "@/features/theme";
import { Avatar } from "@/shared/ui/avatar";
import { useStore } from "effector-react";
import React from "react";
import { IUser } from "shared";
import { SlicedAuthor } from "../../../letter-item/sliced-author";
import { DateTime } from "../../date-time";
import { Recipients } from "../../recipients";
import s from "./style.module.css";

export type InfoProps = {
    author: IUser;
    to: Array<IUser>;
    dateTime: string;
    indicator: ThreeVariantState;
    onChange: () => void;
    hovered: boolean;
};

export const Info: React.FC<InfoProps> = (props) => {
    const resources = useStore($resources);

    return (
        <div className={s.info}>
            <div className={s.avatar}>
                <Avatar src={props.author.avatar} />
            </div>
            <div className={s.topLine}>
                <SlicedAuthor
                    name={props.author.name}
                    surname={props.author.surname}
                    read={true}
                />
                <DateTime dateTime={props.dateTime} />
                <div className={s.markIndicator}>
                    <ThreeStateCheckbox
                        state={props.indicator}
                        onChange={props.onChange}
                        hovered={props.hovered}
                        images={{
                            unset: resources.unmarked,
                            first: resources.marked,
                            second: resources.exclamation,
                        }}
                    />
                </div>
            </div>
            <div className={s.bottomLine}>
                <Recipients to={props.to} />
            </div>
        </div>
    );
};
