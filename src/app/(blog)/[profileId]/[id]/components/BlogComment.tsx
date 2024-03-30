"use client";

import { Comment } from '@/util/AppTypes';
import React, { useState } from 'react';
import styles from "./blogComment.module.css";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import LikeButton from './LikeButton';
import { likeComment, postComment, unLikeComment } from '@/app/actions/comment';
import { useAppDispatch } from '@/lib/hooks';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '@/app/(blog)/components/popup/PopUp';
import CommentArea from './CommentArea';

const MAX_THREAD_LEVEL = 2;
const PADDING_MULTIPLIER = 20;

interface Props {
    comment: Comment, 
    threadLevel: number,
    isLastComment?: boolean,
    profileId: string
}

const BlogComment = ({ profileId, comment, threadLevel, isLastComment = false }: Props) => {

    const [ showReplies, setShowReplies ] = useState<boolean>(false);
    const [ showCommentInput, setShowCommentInput ] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const isMaximumDepthLevel: boolean = threadLevel >= MAX_THREAD_LEVEL;

    const handleOnComment = async (content: string) => {
        const response = await postComment(profileId, comment.blogId, content, comment.id);
        console.log(response);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
        setShowCommentInput(false);
    }

    const onLike = async () => {
        const response = await likeComment(profileId, comment.blogId, comment.id);
        handleResponse(response);
    }

    const onRemoveLike = async () => {
        const response = await unLikeComment(profileId, comment.blogId, comment.id);
        handleResponse(response);
    }

    const handleResponse = (response: any) => {
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
    }

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
                        isLiked={comment.currentUserLikedComment} 
                        likesCount={comment.commentLikesCount} 
                        onRemoveLike={onRemoveLike} 
                        onLiked={onLike}
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
                    {
                        !isMaximumDepthLevel && (
                            <span className={`${styles.replyButtonContainer} x-axis-flex`}>
                                <p 
                                    className={`${styles.replyButton}`}
                                    onClick={e => setShowCommentInput(true)}
                                >Reply</p>
                            </span>
                        )
                    }
                </div>
                {
                    showCommentInput && <CommentArea
                                            onClose={() => setShowCommentInput(false)}
                                            onComment={handleOnComment}
                                        />
                }
            </div>
            {showReplies && comment.threads && <BlogReplies 
                                                    profileId={profileId}
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

const BlogReplies = (
    { profileId, comments, currentThreadLevel }: 
    { profileId: string, comments: Comment[], currentThreadLevel: number }
) => {

    const commentsElem = [];

    for(let i = 0; i < comments.length; i ++) {
        const isLastCommentInThisLevel = i == comments.length - 1;
        commentsElem.push(
            <BlogComment 
                comment={comments[i]} 
                threadLevel={currentThreadLevel + 1} 
                isLastComment={isLastCommentInThisLevel}
                profileId={profileId}
            />)
    }

    return (
        <>
            { commentsElem }
        </>
    )
}

export default BlogComment;
