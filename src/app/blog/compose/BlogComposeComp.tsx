"use client";

import React, { useEffect, useMemo, useState } from 'react';
import styles from "./compose.module.css";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setContent } from '@/lib/features/compose/composeSlice';
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

const BlogComposeComp = () => {

    const dispatch = useAppDispatch();

    const [ editorState, setEditorState ] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        dispatch(setContent(stateToHTML(editorState.getCurrentContent())))
    }, [editorState]);

    return (
        <div className={`${styles.composeArea}`}>
            <Editor 
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName={styles.editorWrapper}
            />
        </div>
    )
}

export default BlogComposeComp;