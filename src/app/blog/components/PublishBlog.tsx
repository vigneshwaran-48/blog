"use client";

import { useAppSelector } from '@/lib/hooks';
import React, { useState } from 'react';
import styles from "./publishBlog.module.css";
import PublishModal from './PublishModal';

const PublishBlog = () => {
    const { isEdit, isSaving } = useAppSelector(state => state.composeSlice);

    const [ isPublishModalOpen, setIsPublishModalOpen ] = useState<boolean>(false);

    const onPublishBlog = async (isEditMode: boolean) => {
        setIsPublishModalOpen(true);
    }

    return (
        <div>
            {
                isSaving ? (
                    <p>Saving ....</p>
                ) :
                (
                    <button 
                        className={`${styles.publishButton} button`}
                        onClick={e=> onPublishBlog(isEdit)}
                    >Publish</button>
                )
            }
            <PublishModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} />
        </div>
    )
}

export default PublishBlog;