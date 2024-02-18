"use client";

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
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

    const debounce = (callback: (blog: Blog) => void, timeout = 3000) => {
        let timer : ReturnType<typeof setTimeout>;
        return (blog: Blog) => {
            clearTimeout(timer);
            dispatch(setIsSaving(true));
            timer = setTimeout(() => callback(blog), timeout);
        }
    }

    const processChange = useMemo(() => debounce(async (blog: Blog) => {
        
        const response = await addBlog(blog)
        if(response.status !== 200 && response.status !== 201) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error}));
        }
        else {
            router.replace(`/blog/compose/${response.blog.id}`);
        }
        dispatch(setIsSaving(false));
    }), []);

    const processEditChange = useMemo(() => debounce(async (blog: Blog) => {
        // dispatch(setIsSaving(true));
        const response = await updateBlog(blog)
        if(response.status !== 200 && response.status !== 201) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error}));
        }
        dispatch(setIsSaving(false));
    }), []);

    const handleChange = async ({ 
        title = blogState.title, 
        content = blogState.content, 
        image = blogState.image 
    }: Partial<Compose>) => {

        if(!blogState.isEdit) {
            processChange({ title, image, content, owner: user });
        }
        else {
            if(!blogState.id) return;
            processEditChange({ 
                id: blogState.id as number, 
                title, 
                owner: user, 
                content, 
                image
            });
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