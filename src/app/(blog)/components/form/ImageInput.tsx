"use client";

import React from 'react';
import { Props } from "./Props";
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const ImageInput = (props: Props) => {

    const { id = "image-input-id", name, value, displayName = "", onChange, width = 40, height = 40 } = props;

    return (
        <div className={styles.imageInput}>
            <label htmlFor={id}>
                <img 
                    src={value} 
                    alt="Organization"
                />
                <div className={`${styles.cameraWrapper} full-body x-axis-flex`}>
                    <FontAwesomeIcon icon={faCamera} />
                </div>
            </label>
            <h3>{ displayName }</h3>
            <input 
                id={id} 
                type="file" 
                name={name} 
                onChange={onChange}
            />
        </div>
    )
}

export default ImageInput;