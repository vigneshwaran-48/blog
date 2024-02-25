import React, { useState } from 'react';
import styles from "./dropDown.module.css";

export type Item = {
    id: string,
    displayName: string
}

interface Props {
    items: Item[],
    displayName: string
}

const Dropdown = ({ items, displayName }: Props) => {

    const [ showDropdown, setShowDropdown ] = useState<boolean>(false);

    const onItemSelect = (id: string) => {

    }

    const itemElems = items.map((item, key) => {
        return (
            <li key={key} onClick={e => onItemSelect(item.id)}>
                <p>{ item.displayName }</p>
            </li>
        )
    });

    return (
        <div className={`${styles.dropDownContainer}`}>
            <button 
                className={`button`} 
                onClick={e => setShowDropdown(prev => !prev)}
            >{ displayName }</button>
            <ul className={`${styles.dropDown} ${showDropdown ? styles.showDropDown : ""}`}>
                { itemElems }
            </ul>
        </div>
    )
}

export default Dropdown;