"use client";

import React, { useState } from 'react'

interface Props {
    displayName: string,
    onClick: () => Promise<any>,
    loadingText: string,
    backgroundColor?: string,
    className?: string
}

const Button = ({ displayName, loadingText, onClick, backgroundColor = "--app-selected-background-color", className = "" }: Props) => {

    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const handleClick = async () => {
        setIsLoading(true);
        await onClick();
        setIsLoading(false);
    }

    return (
        <button 
            className={`button bg-[${backgroundColor}] text-[--app-selected-text-color] ${isLoading ? "active:scale-[1]" : "active:scale-[0.9]"} ${className}`}
            onClick={handleClick}
            disabled={isLoading}
        >
            { isLoading ? loadingText : displayName }
        </button>
    )
}

export default Button;