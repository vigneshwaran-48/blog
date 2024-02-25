"use client";

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from "./publishBlog.module.css";
import { UserMeta } from '@/util/AppTypes';
import PublishModal from './PublishModal';

const PublishBlog = () => {
    const { isEdit, isSaving } = useAppSelector(state => state.composeSlice);

    const [ isPublishModalOpen, setIsPublishModalOpen ] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const router = useRouter();

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
            <PublishModal isOpen={isPublishModalOpen} />
        </div>
    )
}

export default PublishBlog;