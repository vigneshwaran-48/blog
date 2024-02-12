"use client";

import React from 'react';
import styles from "./compose.module.css";
import ContentArea from './components/ContentArea';
import BlogImage from './components/BlogImage';
import Title from './components/Title';
import { Blog } from '@/util/AppTypes';
import { useAppDispatch } from '@/lib/hooks';
import { clearBlog, setBlog, setEditMode } from '@/lib/features/compose/composeSlice';

interface Props {
    blog?: Blog
}

const BlogComposeComp = ({ blog }: Props) => {

    const dispatch = useAppDispatch();

    if(blog) {
        dispatch(setBlog(blog));
        // If the blog details have given then it will be definitely in editing mode.
        dispatch(setEditMode(true));
    }
    else {
        dispatch(clearBlog());
    }

    return (
        <div className={`${styles.composeArea} hide-scrollbar y-axis-flex`}>
            <BlogImage />
            <Title />
            <ContentArea />
        </div>
    )
}

export default BlogComposeComp;