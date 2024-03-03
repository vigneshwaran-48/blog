import { Comment } from '@/util/AppTypes';
import React from 'react';
import BlogComment from './BlogComment';
import styles from "./commentSection.module.css";

interface Props {
    comments: Comment[],
    profileId: string
}

const BlogCommentsSection = ({ comments, profileId }: Props) => {

    const commentsElem = comments.map((comment, key) => 
                                                <BlogComment 
                                                    key={key} 
                                                    comment={comment} 
                                                    threadLevel={0} 
                                                    profileId={profileId} />);

    return (
        <div className={`${styles.commentSection} full-width y-axis-flex`}>
            <h2>Comments ({ comments.length })</h2>
            <div className={`${styles.commentsContainer} full-width y-axis-flex`}>
                { commentsElem }
            </div>
        </div>
    )
}

export default BlogCommentsSection;