"use client";

import { Compose, setTitle } from '@/lib/features/compose/composeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React from 'react';
import Input from '../../components/form/Input';

const Title = ({ onChange }: { onChange: (blog: Partial<Compose>) => void }) => {
    const dispatch = useAppDispatch();
    const title = useAppSelector(state => state.composeSlice.title);

    const handleTitleChange = async (text: string) => {
        dispatch(setTitle(text));
        onChange({ title: text });
    }
    
    return (
        <Input 
            value={title}
            name="Title"
            onChange={text => handleTitleChange(text.currentTarget.value)}
            placeHolder='Title'
            maxLength={25}
        />
    )
}

export default Title;