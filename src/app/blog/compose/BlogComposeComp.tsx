"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setContent } from '@/lib/features/compose/composeSlice';
import styles from "./compose.module.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
    ]
};

const BlogComposeComp = () => {

    const dispatch = useAppDispatch();

    const content = useAppSelector(state => state.composeSlice.content);

    console.log(content);

    return (
        <div className={`${styles.composeArea}`}>
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
            />
        </div>
    )
}

export default BlogComposeComp;