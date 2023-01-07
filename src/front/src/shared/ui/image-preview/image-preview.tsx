import { $resources } from "@/features/theme";
import { useStore } from "effector-react";
import React from "react";
import s from "./style.module.css";

export type BigPreviewProps = {
    name: string;
    bytes: string;
};

export const ImagePreview: React.FC<BigPreviewProps> = (props) => {
    const resources = useStore($resources);

    return (
        <a
            className={s.bigPreview}
            href={props.bytes}
            download={`${props.name}.jpg`}>
            <img src={props.bytes} />
            <div className={s.download}>
                <img src={resources.download} />
                <span>Скачать</span>
            </div>
        </a>
    );
};
