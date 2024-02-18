"use client";

import React from 'react';
import styles from "./moreOptions.module.css";

export interface List {
    content: any,
    hoverRed?: boolean
    onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

interface Props {
    lists: List[], 
    icon: any, 
    top?: string, 
    translateX?: string
}

const MoreOptions = ({ lists, icon, top = "20px", translateX = "" }: Props) => {

    const listElems = lists && lists.map((list, key) => {
        const { content, hoverRed = false, onClick = () => {} } = list;
        return (
            <li 
                key={key} 
                onClick={onClick}
                className={`${hoverRed ? styles.hoverRed : ""}`}
            >{ content }</li>
        )
    });

    return (
        <span tabIndex={0} title="More options" className={`${styles.moreOptionsButton}`}>
            { icon }
            <ul 
                className={`${styles.moreOptions}`}
                style={{
                    top,
                    transform: `${translateX ? `translateX(${translateX})` : "translateX(-50%)"}`,
                    
                }}
            >
                { listElems }
            </ul>
        </span>
    )
}

export default MoreOptions;