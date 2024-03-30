"use client";

import React, { useState } from 'react';
import styles from "./blogComment.module.css";

interface Props {
    onClose: () => void, 
    onComment: (comment: string) => void,
    placeholder?: string,
    hideCancel?: boolean
}

const CommentArea = ({ onClose, onComment, placeholder = "Share your thoughts", hideCancel = false }: Props) => {

    const [ comment, setComment ] = useState<string>("");
    const handleOnComment = () => {
        onComment(comment);
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
                <button 
                    className={`${styles.commentButton} button`}
                    onClick={handleOnComment}
                >Comment</button>
            </div>
        </div>
    )
}

export default CommentArea;