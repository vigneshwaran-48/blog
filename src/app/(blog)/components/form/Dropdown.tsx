import React, { useEffect, useRef, useState } from 'react';
import styles from "./dropDown.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export type Item = {
    id: string,
    displayName: string
}

interface Props {
    items: Item[],
    onSelect: (id: string) => void,
    defaultValue?: string,
    rightAlign?: boolean
}

const Dropdown = ({ items, onSelect, defaultValue, rightAlign = false }: Props) => {

    const [ showDropdown, setShowDropdown ] = useState<boolean>(false);
    const [ selectedItem, setSelectedItem ] = useState<Item>(items[0]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (defaultValue && items.findIndex(item => item.id === defaultValue) >= 0) {
            setSelectedItem(items.find(item => item.id === defaultValue) as Item);
        }
    }, []);

    useEffect(() => {
        if(!selectedItem) {
            setSelectedItem(items[0]);
        }
    }, [items]);

    useEffect(() => {
        const foucusOutHandler = (e: MouseEvent | TouchEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", foucusOutHandler);
        document.addEventListener("touchstart", foucusOutHandler);
        return (() => {
            document.removeEventListener("mousedown", foucusOutHandler);
            document.removeEventListener("touchstart", foucusOutHandler);
        })
    }, []);

    const onItemSelect = (item: Item) => {
        setShowDropdown(false);
        onSelect(item.id);
        setSelectedItem(item);
    }

    const itemElems = items.map((item, key) => {
        return (
            <li key={key} onClick={e => onItemSelect(item)}>
                <p>{ item.displayName }</p>
            </li>
        )
    });

    return (
        <div ref={dropdownRef} className={`${styles.dropDownContainer}`}>
            <div 
                className={`${styles.dropDownDisplay} x-axis-flex`}
                onClick={e => setShowDropdown(prev => !prev)}
            >
                <p>{ selectedItem?.displayName }</p>
                <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <ul className={`${rightAlign ? styles.dropDownRight : styles.dropDownLeft} ${showDropdown ? styles.showDropDown : ""}`}>
                { itemElems }
            </ul>
        </div>
    )
}

export default Dropdown;