import { ChangeEvent } from "react";

export interface Props {
    displayName?: string,
    name: string,
    placeHolder?: string,
    value?: string,
    checked?: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
    width?: number,
    height?: number
}