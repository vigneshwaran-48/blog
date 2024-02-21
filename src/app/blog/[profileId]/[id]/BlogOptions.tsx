"use client";

import React from 'react';
import styles from "./blogOptions.module.css";
import { BlogLike } from '@/util/AppTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import { likeBlog, removeLikeFromBlog } from '@/app/actions/blog';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../../components/popup/PopUp';

interface Props {
    likes: BlogLike[],
    blogId: number
}

const notLikedIcon = "/heart.png";
const likedIcon = "/heart_full.png";

const BlogOptions = ({ likes, blogId }: Props) => {

    const userId = useAppSelector(state => state.userSlice.id);
    const dispatch = useAppDispatch();
    const isUserLiked: boolean = likes.findIndex(like => like.user.id === userId) >= 0;

    const onRemoveLike = async () => {
        const response = await removeLikeFromBlog(blogId);
        handleResponse(response);
    }

    const onLiked = async () => {
        const response = await likeBlog(blogId);
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
            <span className={`${styles.likesContainer} x-axis-flex`}>
                {
                    isUserLiked 
                        ? <Image src={likedIcon} alt="liked icon" width={20} height={20} onClick={e => onRemoveLike()} /> 
                        : <Image src={notLikedIcon} alt="Not liked icon" width={20} height={20} onClick={e => onLiked()} />
                }
                <p>{ likes.length }</p>
            </span>
        </div>
    )
}

export default BlogOptions;