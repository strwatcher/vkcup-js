import {
    SimpleCheckbox,
    SimpleCheckboxState,
} from "@/entities/simple-checkbox";
import { Avatar } from "@/shared/ui/avatar";
import React from "react";

export type SelectableAvatarProps = {
    id: string;
    selected: boolean;
    avatarImage: string;
    images: {
        [P in SimpleCheckboxState]: string;
    };
    onChange: (id: string) => void;
    hovered: boolean;
};

export const SelectableAvatar: React.FC<SelectableAvatarProps> = (props) => {
    if ((!props.selected && props.hovered) || props.selected) {
        return (
            <SimpleCheckbox
                checked={props.selected}
                images={props.images}
                onChange={() => props.onChange(props.id)}
            />
        );
    }

    return <Avatar src={props.avatarImage} />;
};
