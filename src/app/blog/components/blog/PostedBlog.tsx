import { Blog } from '@/util/AppTypes';
import { faBookmark, faEllipsis, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';
import styles from "./page.module.css";
import postedBlogStyles from "./postedBlog.module.css";
import BlogContentComp from './BlogContentComp';

const PostedBlog = ({ blog }: { blog: Blog }) => {

    const categories = blog.categories?.map(category => {
        return (
            <div 
                key={category} 
                className={styles.category}
                title="category"
            >{ category }</div>
        )
    })

    return (
        <article className={`${styles.blogMeta} y-axis-flex`}>
            <div className={`${styles.blogMetaHeader} x-axis-flex`}>
                <Image 
                    src={blog.owner.image as string} 
                    alt="blogged user"
                    width={24}
                    height={24}
                />
                <b><p>{ blog.owner.name }</p></b>
            </div>

            <BlogContentComp title={blog.title} description={blog.description || ""} image={blog.image} />
            
            <div className={`${styles.blogFooter} x-axis-flex`}>
                <p>posted { blog.displayPostedDate }</p>
                <div className={`${styles.categoryContainer} hide-scrollbar x-axis-flex`}>
                    { categories }
                </div>
                <div className={`${styles.otherActionsContainer} x-axis-flex`}>
                    <span tabIndex={0} title="More options" className={`${postedBlogStyles.moreOptionsButton}`}>
                        <FontAwesomeIcon icon={faEllipsis} />
                        <ul className={`${postedBlogStyles.moreOptions}`}>
                            <li>Edit</li>
                            <li className={`${postedBlogStyles.hoverRed}`}>Delete</li>
                        </ul>
                    </span>
                </div>
            </div>
        </article>
    )
}

export default PostedBlog;