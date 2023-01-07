import { SimpleCheckbox } from "@/shared/ui";
import { Avatar } from "@/shared/ui/avatar";
import { SimpleCheckboxState } from "@/shared/ui/simple-checkbox";
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
