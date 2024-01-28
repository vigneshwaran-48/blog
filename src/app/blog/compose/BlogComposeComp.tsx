"use client";

import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from "./compose.module.css";

const BlogComposeComp = () => {

    const [ content, setContent ] = useState<string>("");

    return (
        <div className={`${styles.composeArea}`}>
            <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            />
        </div>
    )
}

export default BlogComposeComp;