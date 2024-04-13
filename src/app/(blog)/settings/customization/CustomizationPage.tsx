"use client";

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React from 'react'
import RadioGroup from '../../components/form/RadioGroup';
import { Props } from '../../components/form/Props';
import { Theme, setTheme } from '@/lib/features/settings/preferencesSlice';
import { updateTheme } from '@/app/actions/preferences';
import { Preferences } from '@/util/AppTypes';

const CustomizationPage = () => {

    const theme = useAppSelector(state => state.preferencesSlice.theme);
    const dispatch = useAppDispatch();

    const handleThemeChange = async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.target.value;
        const response = await updateTheme(value as Theme);
        const preferences: Preferences = response.preferences;
        dispatch(setTheme(preferences.theme));
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