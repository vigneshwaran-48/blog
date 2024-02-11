"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from "./moreOptions.module.css";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { deleteBlog } from '@/app/actions/blog';
import { useAppDispatch } from '@/lib/hooks';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../popup/PopUp';

const PostedBlogMoreOptions = ({ id }: { id: number }) => {

    const dispatch = useAppDispatch();

    const handleDeleteBlog = async (id: number) => {
        const response = await deleteBlog(id);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error}));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message}));
    }

    return (
        <span tabIndex={0} title="More options" className={`${styles.moreOptionsButton}`}>
            <FontAwesomeIcon icon={faEllipsis} />
            <ul className={`${styles.moreOptions}`}>
                <li>Edit</li>
                <li className={`${styles.hoverRed}`} onClick={e => handleDeleteBlog(id)}>Delete</li>
            </ul>
        </span>
    )
}

export default PostedBlogMoreOptions;