"use client";

import { Comment } from '@/util/AppTypes';
import React from 'react';
import BlogComment from './BlogComment';
import styles from "./commentSection.module.css";
import CommentArea from './CommentArea';
import { postComment } from '@/app/actions/comment';
import { getUniqueId } from '@/util/getUniqueId';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { useAppDispatch } from '@/lib/hooks';
import { PopupType } from '@/app/blog/components/popup/PopUp';

interface Props {
    comments: Comment[],
    profileId: string,
    blogId: number
}

const BlogCommentsSection = ({ blogId, comments, profileId }: Props) => {

    const dispatch = useAppDispatch();

    const handleOnComment = async (content: string) => {
        const response = await postComment(profileId, blogId, content, null);
        console.log(response);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
    }

    const commentsElem = comments.map((comment, key) => 
                                                <BlogComment 
                                                    key={key} 
                                                    comment={comment} 
                                                    threadLevel={0} 
                                                    profileId={profileId} />);

    return (
        <div className={`${styles.commentSection} full-width y-axis-flex`}>
            <h2>Comments ({ comments.length })</h2>
            <CommentArea onClose={() => {}} onComment={handleOnComment} hideCancel={true} />
            <div className={`${styles.commentsContainer} full-width y-axis-flex`}>
                { commentsElem }
            </div>
        </div>
    )
}

export default BlogCommentsSection;