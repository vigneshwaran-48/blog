import React from 'react';
import { Blog } from '@/util/AppTypes';
import styles from "./page.module.css";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faMinus } from '@fortawesome/free-solid-svg-icons';
import BlogContentComp from './BlogContentComp';

export const BlogComp = ({ blog }: { blog: Blog }) => {

    const categories = blog.categories?.map(category => {
        return (
            <div 
                key={category} 
                className={styles.category}
                title="category"
            >{ category }</div>
        )
    });

    return (
        <article className={`${styles.blogMeta} y-axis-flex`}>
            <div className={`${styles.blogMetaHeader} x-axis-flex`}>
                <Image 
                    src={blog.owner.image as string} 
                    alt="blogged user"
                    width={24}
                    height={24}
                />
                <b><p>{ blog.owner.name || "Untitled Blog" }</p></b>
                <p>{ blog.postedTime }</p>
            </div>

            <BlogContentComp title={blog.title} description={blog.description || ""} image={blog.image} />
            
            <div className={`${styles.blogFooter} x-axis-flex`}>
                <div className={`${styles.categoryContainer} hide-scrollbar x-axis-flex`}>
                    { categories }
                </div>
                <div className={`${styles.otherActionsContainer} x-axis-flex`}>
                    <span title="bookmark this blog">
                        <FontAwesomeIcon icon={faBookmark} />
                    </span>
                    <span title="Don't Like this type blog">
                        <FontAwesomeIcon icon={faMinus} />
                    </span>
                </div>
            </div>
        </article>
    )
}
