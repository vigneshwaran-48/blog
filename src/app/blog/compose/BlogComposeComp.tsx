"use client";

import React, { useEffect } from 'react';
import styles from "./compose.module.css";
import ContentArea from './components/ContentArea';
import BlogImage from './components/BlogImage';
import Title from './components/Title';
import { Blog } from '@/util/AppTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Compose, clearBlog, setBlog, setEditMode, setIsSaving } from '@/lib/features/compose/composeSlice';
import { addBlog, updateBlog } from '@/app/actions/blog';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../components/popup/PopUp';
import { useRouter } from 'next/navigation';

interface Props {
    blog?: Blog
}

const BlogComposeComp = ({ blog }: Props) => {

    const dispatch = useAppDispatch();
    const blogState = useAppSelector(state => state.composeSlice);
    const user = useAppSelector(state => state.userSlice);
    const router = useRouter();

    useEffect(() => {
        if(blog) {
            dispatch(setBlog(blog));
            // If the blog details have given then it will be definitely in editing mode.
            dispatch(setEditMode(true));
        }
        else {
            dispatch(clearBlog());
        }
    }, [blog]);

    const handleChange = async ({ 
        title = blogState.title, 
        content = blogState.content, 
        image = blogState.image 
    }: Partial<Compose>) => {

        if(!blogState.isEdit) {
            dispatch(setEditMode(true));
            const response = await addBlog({ 
                                title, 
                                owner: user, 
                                content, 
                                image
                            });
            if(response.status !== 200 && response.status !== 201) {
                dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error}));
            }
            else {
                router.replace(`/blog/compose/${response.blog.id}`);
            }
        }
        else {
            if(!blogState.id) return;
            const response = await updateBlog({ 
                id: blogState.id as number, 
                title, 
                owner: user, 
                content, 
                image
            });
            if(response.status !== 200 && response.status !== 201) {
                dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error}));
            }
        }
    }

    return (
        <div className={`${styles.composeArea} hide-scrollbar y-axis-flex`}>
            <BlogImage onChange={handleChange} />
            <Title onChange={handleChange} />
            <ContentArea onChange={handleChange} />
        </div>
    )
}

export default BlogComposeComp;