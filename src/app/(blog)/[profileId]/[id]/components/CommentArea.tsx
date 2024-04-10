"use client";

import React, { useState } from 'react';
import styles from "./blogComment.module.css";
import Button from '@/app/(blog)/components/form/Button';

interface Props {
    onClose: () => void, 
    onComment: (comment: string) => Promise<any>,
    placeholder?: string,
    hideCancel?: boolean
}

const CommentArea = ({ onClose, onComment, placeholder = "Share your thoughts", hideCancel = false }: Props) => {

    const [ comment, setComment ] = useState<string>("");
    const handleOnComment = async () => {
        await onComment(comment);
        setComment("");
    }

    return (
        <div className={`${styles.commentArea} y-axis-flex`}>
            <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder={placeholder}
                className="border outline-none"
            ></textarea>
            <div className={`${styles.commentAreaButtonsContainer} x-axis-flex`}>
                {
                    !hideCancel && <button 
                                        className={`button`}
                                        onClick={e => onClose()}
                                    >Cancel</button>
                }
                <Button 
                    displayName="Comment"
                    loadingText="Commenting ..."
                    onClick={handleOnComment}
                />
            </div>
        </div>
    )
}

export default CommentArea;