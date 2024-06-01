"use client";

import React from 'react';
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import MoreOptions, { List } from './MoreOptions';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { deleteBlog } from '@/app/actions/blog';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../popup/PopUp';
import { Tag } from '@/util/AppTypes';

interface Props {
    categories: Tag[],
    blogId: string,
    postedDate: string
}

const BlogMetaFooter = ({ blogId, categories, postedDate }: Props) => {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleDeleteBlog = async (id: string) => {
        const response = await deleteBlog(id);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error}));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message}));
    }

    const lists: List[] = [
        {
            content: "Edit",
            onClick: (e) => router.push(`/compose/${blogId}`)
        },
        {
            content: "Delete",
            hoverRed: true,
            onClick: (e) => handleDeleteBlog(blogId)
        }
    ];

    const categoriesElems = categories?.map(category => {
        return (
            <div 
                key={category.id} 
                className={styles.category}
                title="category"
            >{ category.name }</div>
        )
    });

    return (
        <div className={`${styles.blogFooter} x-axis-flex`}>
            <p>posted { postedDate }</p>
            <div className={`${styles.categoryContainer} hide-scrollbar x-axis-flex`}>
                { categoriesElems }
            </div>
            <div className={`${styles.otherActionsContainer} x-axis-flex`} onClick={e => e.stopPropagation()}>
                <MoreOptions lists={lists} icon={<FontAwesomeIcon icon={faEllipsis} />} />
            </div>
        </div>
    )
}

export default BlogMetaFooter;