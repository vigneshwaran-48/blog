import React from 'react';
import { BlogMeta } from '@/util/AppTypes';
import styles from "./page.module.css";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faMinus } from '@fortawesome/free-solid-svg-icons';

export const Blog = ({ blog }: { blog: BlogMeta }) => {

    const categories = blog.categories.map(category => {
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
                    src={blog.postedUser.image} 
                    alt="blogged user"
                    width={24}
                    height={24}
                />
                <b><p>{ blog.postedUser.name }</p></b>
                <p>{ blog.date }</p>
            </div>
            <div className={`${styles.blogContent} x-axis-flex`}>
                <div>
                    <h2 title="title">{ blog.title }</h2>
                    <p>{ blog.content }</p>
                </div>
                <Image 
                    src={blog.image}
                    alt="Blog's image"
                    width={115}
                    height={115}
                />
            </div>
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
