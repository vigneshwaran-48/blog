"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { setContent } from '@/lib/features/compose/composeSlice';
import styles from "./compose.module.css";
import { EditorState } from 'draft-js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

    return <CKEditor 
                editor={ ClassicEditor }
                onChange={e => console.log(e)}
            />
}

export default BlogComposeComp;