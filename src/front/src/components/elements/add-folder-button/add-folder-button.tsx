import { $resources } from "@/features/theme";
import { useStore } from "effector-react";
import React from "react";
import s from "./style.module.css";

export type AddFolderButtonProps = {
    onClick?: () => void;
};

export const AddFolderButton: React.FC<AddFolderButtonProps> = (props) => {
    const resources = useStore($resources);
    return (
        <div className={s.addFolder}>
            <img src={resources.plus} />
            <span className={s.text}>Новая папка</span>
        </div>
    );
};
