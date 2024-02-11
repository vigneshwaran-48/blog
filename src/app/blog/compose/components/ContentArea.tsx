"use client";

import { setContent } from '@/lib/features/compose/composeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react'
import 'react-quill/dist/quill.snow.css';
import styles from "./content.module.css";

const ContentArea = () => {

    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill"), { ssr: false }),
        []
    );

    const dispatch = useAppDispatch();
    const content = useAppSelector(state => state.composeSlice.content);

    return (
        <ReactQuill 
            value={content} 
            onChange={content => dispatch(setContent(content))} 
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