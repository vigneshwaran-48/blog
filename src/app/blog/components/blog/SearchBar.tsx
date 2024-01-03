"use client";

import React from 'react'
import styles from "./page.module.css";

interface Props {
    shouldExpandOnActive?: boolean,
    placeHolder?: string,
    callback?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchBar = (props: Props) => {

    const { shouldExpandOnActive = false, placeHolder = "Search", callback = () => "" } = props;

    return (
        <label htmlFor="search-bar-id" className={`${styles.searchBarLabel}`}>
            <input 
                id="search-bar-id" 
                name="search-bar"
                placeholder={ placeHolder }
                onChange={callback}
            />
        </label>
    )
}
