"use client";

import React from 'react';
import styles from "./blogOptions.module.css";
import { BlogLike } from '@/util/AppTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { likeBlog, removeLikeFromBlog } from '@/app/actions/blog';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../../../components/popup/PopUp';
import LikeButton from './LikeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEye } from '@fortawesome/free-solid-svg-icons';

interface Props {
    likes: BlogLike[],
    blogId: string,
    profileId: string,
    viewsCount: number,
    commentsCount: number
}

const BlogOptions = ({ likes, blogId, profileId, viewsCount, commentsCount }: Props) => {

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
            {
                viewsCount > 0 && 
                    <span className="flex ml-4 items-center justify-between">
                        <FontAwesomeIcon 
                            icon={faEye} 
                            color={document.documentElement.style.getPropertyValue("--app-text-color")} />
                        <p className="ml-1">{ viewsCount }</p>
                    </span>
            }
            {
                commentsCount > 0 && 
                    <span className="flex ml-4 items-center justify-between">
                        <FontAwesomeIcon 
                            icon={faComment} 
                            color={document.documentElement.style.getPropertyValue("--app-text-color")} />
                        <p className="ml-1">{ commentsCount }</p>
                    </span>
            }
        </div>
    )
}

export default BlogOptions;