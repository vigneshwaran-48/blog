"use client";

import React, { useCallback, useEffect, useRef } from 'react';
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
        console.log("use effect")
        if(blog) {
            dispatch(setBlog(blog));
            // If the blog details have given then it will be definitely in editing mode.
            dispatch(setEditMode(true));
        }
        else {
            dispatch(clearBlog());
        }
    }, [blog]);

    const debounce = useCallback((callback: (blog: Blog) => void, timeout = 3000) => {
        console.log("Creating debounce");
        let timer : ReturnType<typeof setTimeout>;
        return (blog: Blog) => {
            console.log("Clearing previous timer");
            clearTimeout(timer);
            timer = setTimeout(() => callback(blog), timeout);
        }
    }, [blog]);

    const processChange = useCallback(debounce((blog: Blog) => {
        console.log("Saving ...");
        // const response = 
        addBlog(blog).then(response => {
            if(response.status !== 200 && response.status !== 201) {
                dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error}));
            }
            else {
                router.replace(`/blog/compose/${response.blog.id}`);
            }
            console.log("Saved");
        }) 
    }), [blog]);

    const handleChange = async ({ 
        title = blogState.title, 
        content = blogState.content, 
        image = blogState.image 
    }: Partial<Compose>) => {

        if(!blogState.isEdit) {
            // dispatch(setEditMode(true));
            processChange({ title, image, content, owner: user });
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