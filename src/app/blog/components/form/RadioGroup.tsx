"use client";

import React from 'react';
import { Props } from './Props';
import RadioButton from './RadioButton';
import styles from "./page.module.css";

interface RadioProps {
    displayName: string,
    radios: Props[]
}

const RadioGroup = (props: RadioProps) => {

    const { displayName, radios } = props;

    const radioElems = radios.map(radio => {
        return (
            <RadioButton 
                key={radio.value}
                name={radio.name}
                displayName={radio.displayName}
                value={radio.value}
                checked={radio.checked}
                onChange={radio.onChange}
            />
        );
    });

    return (
        <div className={`${styles.radioGroup} full-width`}>
            <p>{ displayName }</p>
            <div className={`hide-scrollbar x-axis-flex`}>
                { radioElems }
            </div>
        </div>
    )
}

export default RadioGroup;