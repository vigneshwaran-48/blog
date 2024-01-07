"use client";

import React from 'react';
import { Props } from './Props';
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';

const RadioButton = (props: Props) => {

    const { name, checked, onChange, value, displayName = name } = props;

    return (
        <label className={`${styles.radio} x-axis-flex`}>
            <input 
                type="radio"
                name={name}
                checked={checked}
                value={value}
                onChange={onChange}
            />
            <span className={`x-axis-flex`}>
                <i></i>
            </span>
            <p>{ displayName }</p>
        </label>
    )
}

export default RadioButton;