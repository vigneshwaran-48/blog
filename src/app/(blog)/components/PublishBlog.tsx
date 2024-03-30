"use client";

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useState } from 'react';
import styles from "./publishBlog.module.css";
import PublishModal from './PublishModal';
import { unPublishBlog } from '@/app/actions/blog';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from './popup/PopUp';
import { setPublished } from '@/lib/features/compose/composeSlice';

const PublishBlog = () => {
    const { isSaving, publised, id } = useAppSelector(state => state.composeSlice);
    const [ isPublishModalOpen, setIsPublishModalOpen ] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onPublishBlog = async () => {
        setIsPublishModalOpen(true);
    }
    const onUnPublishBlog = async () => {
        const response = await unPublishBlog(id as string);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
        dispatch(setPublished(false));
    }

    return (
        <div>
            {
                isSaving ? (
                    <p>Saving ....</p>
                ) :
                publised ? 
                    (
                        <button 
                            className={`${styles.unPublishButton} button`}
                            onClick={e=> onUnPublishBlog()}
                        >UnPublish</button>
                    ) :
                    (
                        <button 
                            className={`${styles.publishButton} button`}
                            onClick={e=> onPublishBlog()}
                        >Publish</button>
                    )
            }
            <PublishModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} />
        </div>
    )
}

export default PublishBlog;