"use client";

import { Compose, setContent } from '@/lib/features/compose/composeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react'
import 'react-quill/dist/quill.snow.css';

const ContentArea = ({ onChange }: { onChange: (blog: Partial<Compose>) => void }) => {

    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill"), { ssr: false }),
        []
    );

    const dispatch = useAppDispatch();
    const content = useAppSelector(state => state.composeSlice.content);

    const handleContentChange = (text: string) => {
        dispatch(setContent(text));
        onChange({ content: text });
    }

    return (
        <ReactQuill 
            value={content} 
            onChange={handleContentChange} 
            theme="snow"
            modules={{
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image'],
                    ['clean']
                ]
            }}
            placeholder="Today is a wonderful day"
            // scrollingContainer={styles.contentScrollContainer}
        />
    )
}

export default ContentArea;