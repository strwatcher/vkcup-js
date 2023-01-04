import React from "react";
import { useTheme } from "../../../hooks/use-theme";
import s from "./style.module.css";

export type BigPreviewProps = {
    name: string;
    bytes: string;
};

export const BigPreview: React.FC<BigPreviewProps> = (props) => {
    const { resources } = useTheme();

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
