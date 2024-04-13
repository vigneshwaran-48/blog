"use client";

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React from 'react'
import RadioGroup from '../../components/form/RadioGroup';
import { Props } from '../../components/form/Props';
import { Theme, setTheme } from '@/lib/features/settings/preferencesSlice';

const CustomizationPage = () => {

    const theme = useAppSelector(state => state.preferencesSlice.theme);
    const dispatch = useAppDispatch();

    const handleThemeChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(setTheme(value as Theme));
    }

    const themes: Props[] = [
        {
            name: "theme",
            displayName: "Light",
            value: "LIGHT",
            checked: theme === "LIGHT",
            onChange: handleThemeChange
        },
        {
            name: "theme",
            displayName: "Dark",
            value: "DARK",
            checked: theme === "DARK",
            onChange: handleThemeChange
        }
    ];

    return (
        <div className="p-2">
            <RadioGroup radios={themes} displayName="Theme" />
        </div>
    )
}

export default CustomizationPage;