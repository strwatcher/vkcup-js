import {
    SimpleCheckbox,
    SimpleCheckboxState,
} from "@/entities/simple-checkbox";
import { joinClasses } from "@/shared/lib/utils/join-classes";
import { Avatar } from "@/shared/ui/avatar";
import React from "react";
import s from "./style.module.css";

export type SelectableAvatarProps = {
    id: string;
    selected: boolean;
    avatarSrc: string;
    images: {
        [P in SimpleCheckboxState]: string;
    };
    onChange: (id: string) => void;
    hovered: boolean;
};

export const SelectableAvatar: React.FC<SelectableAvatarProps> = (props) => {
    const className = React.useMemo(() => {
        const selected = props.selected && s.selected;
        const hovered = props.hovered && s.hovered;

        return joinClasses(s.wrapper, selected, hovered);
    }, [props.selected, props.hovered]);

    return (
        <div
            className={className}
            onClick={(e) => e.stopPropagation()}>
            {!props.selected && (
                <div className={s.avatar}>
                    <Avatar src={props.avatarSrc ?? ""} />
                </div>
            )}
            <div className={s.checkbox}>
                <SimpleCheckbox
                    checked={props.selected}
                    images={props.images}
                    onChange={() => props.onChange(props.id)}
                />
            </div>
        </div>
    );
};
