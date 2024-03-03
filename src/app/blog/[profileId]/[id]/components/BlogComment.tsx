"use client";

import { Comment } from '@/util/AppTypes';
import React, { useState } from 'react';
import styles from "./blogComment.module.css";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import LikeButton from './LikeButton';

const MAX_THREAD_LEVEL = 2;
const PADDING_MULTIPLIER = 20;

interface Props {
    comment: Comment, 
    threadLevel: number,
    isLastComment?: boolean
}

const BlogComment = ({ comment, threadLevel, isLastComment = false }: Props) => {

    const [ showReplies, setShowReplies ] = useState<boolean>(false);
    const isMaximumDepthLevel: boolean = threadLevel >= MAX_THREAD_LEVEL;

    return (
        <div
            className={`${styles.commentContainer} y-axis-flex`}
            style={{
                width: `calc(100% - ${!isMaximumDepthLevel ? threadLevel * PADDING_MULTIPLIER : 0}px`,
                borderBottomStyle: "solid",
                borderBottomWidth: `${isLastComment ? "0px" : "1px"}`,
                borderLeftStyle: "solid",
                borderLeftWidth: `${isMaximumDepthLevel ? "0px" : "1px"}`
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
                    {
                        !isMaximumDepthLevel && (
                            <span 
                                className={`${styles.repliesButton} x-axis-flex`} 
                                onClick={e => setShowReplies(prevState => !prevState)}>
                                <FontAwesomeIcon icon={faComments} />
                                <p>{ comment.threads?.length || "" }</p>
                            </span>
                        )
                    }
                </div>
            </div>
            {showReplies && comment.threads && <BlogReplies 
                                                    comments={comment.threads} 
                                                    currentThreadLevel={threadLevel} />}
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

const BlogReplies = ({ comments, currentThreadLevel }: { comments: Comment[], currentThreadLevel: number }) => {

    const commentsElem = [];

    for(let i = 0; i < comments.length; i ++) {
        const isLastCommentInThisLevel = i == comments.length - 1;
        commentsElem.push(
            <BlogComment 
                comment={comments[i]} 
                threadLevel={currentThreadLevel + 1} 
                isLastComment={isLastCommentInThisLevel}
            />)
    }

    return (
        <>
            { commentsElem }
        </>
    )
}

export default BlogComment;
