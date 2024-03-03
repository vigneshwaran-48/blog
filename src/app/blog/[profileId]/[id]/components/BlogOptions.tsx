"use client";

import React from 'react';
import styles from "./blogOptions.module.css";
import { BlogLike } from '@/util/AppTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import { likeBlog, removeLikeFromBlog } from '@/app/actions/blog';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../../../components/popup/PopUp';
import LikeButton from './LikeButton';

interface Props {
    likes: BlogLike[],
    blogId: number,
    profileId: string
}

const BlogOptions = ({ likes, blogId, profileId }: Props) => {

    const userId = useAppSelector(state => state.userSlice.id);
    const dispatch = useAppDispatch();
    const isUserLiked: boolean = likes.findIndex(like => like.user.id === userId) >= 0;

    const onRemoveLike = async () => {
        const response = await removeLikeFromBlog(blogId, profileId);
        handleResponse(response);
    }

    const onLiked = async () => {
        const response = await likeBlog(blogId, profileId);
        handleResponse(response);
    }

    const handleResponse = (response: any) => {
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
    }

    return (
        <div className={`${styles.blogOptions} full-width x-axis-flex`}>
            <LikeButton 
                isLiked={isUserLiked} 
                likesCount={likes.length} 
                onRemoveLike={onRemoveLike}
                onLiked={onLiked}
            />
        </div>
    )
}

export default BlogOptions;