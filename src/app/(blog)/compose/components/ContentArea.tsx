"use client";

import { Compose, setContent } from '@/lib/features/compose/composeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

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

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];


    return (
        <ReactQuill 
            value={content} 
            onChange={handleContentChange} 
            theme="snow"
            modules={{
                toolbar: toolbarOptions
            }}
            placeholder="Today is a wonderful day"
        />
    )
}

export default ContentArea;