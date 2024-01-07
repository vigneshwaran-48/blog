"use client";

import React from 'react';
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Props } from './Props';

const Checkbox = (props: Props) => {

    const { name, checked, onChange, displayName = name } = props;

    return (
        <label className={`${styles.checkbox} x-axis-flex`}>
            <input 
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <span>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <p>{ displayName }</p>
        </label>
    )
}

export default Checkbox;