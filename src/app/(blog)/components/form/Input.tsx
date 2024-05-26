"use client";

import React from 'react';
import styles from "./page.module.css";
import { Props } from './Props';

const TextArea = (props: Props) => {

    const { name, placeHolder = "", value, onChange, displayName = name, maxLength = 100 } = props;

    return (
        <label className={`${styles.label}`}>
            <p>{ displayName }</p>
            <input
                name={name}
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
            />
        </label>
    )
}

export default TextArea;