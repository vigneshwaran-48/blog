"use client";

import { Comment } from '@/util/AppTypes';
import React, { useState } from 'react';
import styles from "./blogComment.module.css";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import LikeButton from './LikeButton';

const MAX_THREAD_LEVEL = 2;
const PADDING_MULTIPLIER = 50;

const BlogComment = ({ comment, threadLevel }: { comment: Comment, threadLevel: number }) => {

    const [ showReplies, setShowReplies ] = useState<boolean>(false);

    return (
        <div
            className={`${styles.commentContainer} y-axis-flex`}
            style={{
                width: `calc(100% - ${threadLevel <= MAX_THREAD_LEVEL ? threadLevel * PADDING_MULTIPLIER : 0}px`
            }}
        >
            <div className={`${styles.comment} full-width y-axis-flex`}>
                <BlogCommentHeader 
                    userImage={comment.commentBy.image || "person.jpg"} 
                    userName={comment.commentBy.name || "Guest"}
                />
                <div className={`${styles.commentContent} full-width`}>
                    <p>{ comment.content }</p>
                </div>
                <div className={`${styles.commentFooter} x-axis-flex`}>
                    <LikeButton 
                        isLiked={false} 
                        likesCount={0} 
                        onRemoveLike={() => {}} 
                        onLiked={() => {}}
                    />
                    <span 
                        className={`${styles.repliesButton} x-axis-flex`} 
                        onClick={e => setShowReplies(prevState => !prevState)}>
                        <FontAwesomeIcon icon={faComments} />
                        <p>{ comment.threads?.length || "" }</p>
                    </span>
                </div>
            </div>
            {showReplies && comment.threads 
                                && 
                                comment.threads.map((thread, key) => <BlogComment 
                                                                        key={key} 
                                                                        comment={thread} 
                                                                        threadLevel={threadLevel + 1} />)}
        </div>
    )
}

const BlogCommentHeader = ({ userImage, userName }: { userImage: string, userName: string }) => {

    return (
        <div className={`${styles.commentHeader} full-width x-axis-flex`}>
            <Image 
                src={userImage}
                width={32}
                height={32}
                alt="Commented User"
            />
            <div className={`${styles.commentUserNameAndTime} y-axis-flex`}>
                <b><p>{ userName }</p></b>
                <p>2 Hours Ago</p>
            </div>
            <span>
                <FontAwesomeIcon icon={faEllipsis} />
            </span>
        </div>
    )
}

export default BlogComment;
