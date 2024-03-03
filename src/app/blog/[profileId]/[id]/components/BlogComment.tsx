"use client";

import { Comment } from '@/util/AppTypes';
import React from 'react';
import styles from "./blogComment.module.css";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import LikeButton from './LikeButton';

const BlogComment = ({ comment }: { comment: Comment }) => {
    return (
        <div className={`${styles.comment} full-width y-axis-flex`}>
            <div className={`${styles.commentHeader} full-width x-axis-flex`}>
                <Image 
                    src={comment.commentBy.image || "/person.jpg"}
                    width={32}
                    height={32}
                    alt="Commented User"
                />
                <div className={`${styles.commentUserNameAndTime} y-axis-flex`}>
                    <b><p>{ comment.commentBy.name }</p></b>
                    <p>2 Hours Ago</p>
                </div>
                <span>
                    <FontAwesomeIcon icon={faEllipsis} />
                </span>
            </div>
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
            </div>
        </div>
    )
}

export default BlogComment;
