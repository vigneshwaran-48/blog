"use client";

import React from 'react';
import { Props } from "./Props";
import styles from "./page.module.css";

const ImageInput = (props: Props) => {

    const { name, value, displayName = "", onChange, width = 40, height = 40 } = props;

    return (
        <div className={styles.imageInput}>
            <label>
                <img 
                    src={value} 
                    alt="Organization"
                    // width={`${width}px`}
                    // height={`${height}px`}
                />
            </label>
            <h3>{ displayName }</h3>
            <input type='file' name='' />
        </div>
    )
}

export default ImageInput;