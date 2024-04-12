"use client";

import { useAppSelector } from '@/lib/hooks';
import React, { useEffect } from 'react'

interface Props {
    children: React.ReactNode
}

const BACKGROUND_COLOR_VAR = "--app-background-color";
const TEXT_COLOR_VAR = "--app-text-color";

const LIGHT_BACKGROUND_COLOR_VAR = "--app-light-background-color";
const LIGHT_TEXT_COLOR_VAR = "--app-light-text-color";

const ThemeProvider = ({ children }: Props) => {

    const theme = useAppSelector(state => state.preferencesSlice.theme);

    useEffect(() => {
        document.documentElement.style.setProperty(BACKGROUND_COLOR_VAR, theme === "DARK" ? "#222831" : "white");
        document.documentElement.style.setProperty(TEXT_COLOR_VAR, theme === "DARK" ? "white" : "black");
        document.documentElement.style.setProperty(LIGHT_BACKGROUND_COLOR_VAR, theme === "DARK" ? "#31363F" : "hsl(0, 4%, 86%)");
        document.documentElement.style.setProperty(LIGHT_TEXT_COLOR_VAR, theme === "DARK" ? "#EEEEEE" : "hsl(15, 2%, 51%)");
        document.documentElement.style.colorScheme = theme.toLowerCase();
    }, [theme]);

    return (
        <>
            { children }
        </>
    )
}

export default ThemeProvider;