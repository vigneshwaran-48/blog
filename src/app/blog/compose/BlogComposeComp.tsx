"use client";

import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from "./compose.module.css";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setContent } from '@/lib/features/compose/composeSlice';

const BlogComposeComp = () => {

    const content = useAppSelector(state => state.composeSlice.content);

    const dispatch = useAppDispatch();

    return (
        <div className={`${styles.composeArea}`}>
            <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={(value: string) => dispatch(setContent(value))}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            />
        </div>
    )
}

export default BlogComposeComp;