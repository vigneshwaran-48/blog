"use client";

import React from 'react'
import styles from "./page.module.css";

interface Props {
    shouldExpandOnActive?: boolean,
    placeHolder?: string,
    onSearch?: (query: string) => void,
    value?: string
}

export const SearchBar = (props: Props) => {

    const { shouldExpandOnActive = false, placeHolder = "Search", onSearch = () => {}, value } = props;

    return (
        <label htmlFor="search-bar-id" className={`${styles.searchBarLabel}`}>
            {
                value ? 
                    <input 
                        id="search-bar-id" 
                        name="search-bar"
                        placeholder={ placeHolder }
                        onChange={e => onSearch(e.target.value)}
                        value={value}
                    />
                    :
                        <input 
                            id="search-bar-id" 
                            name="search-bar"
                            placeholder={ placeHolder }
                            onChange={e => onSearch(e.target.value)}
                        />
            }
            
        </label>
    )
}
