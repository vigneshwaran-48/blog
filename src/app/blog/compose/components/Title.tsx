"use client";

import { setTitle } from '@/lib/features/compose/composeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React from 'react';
import Input from '../../components/form/Input';

const Title = () => {
    const dispatch = useAppDispatch();
    const title = useAppSelector(state => state.composeSlice.title);
    
    return (
        <Input 
            value={title}
            name="Title"
            onChange={text => dispatch(setTitle(text.target.value))}
            placeHolder='Title'
        />
    )
}

export default Title;