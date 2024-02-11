import React from 'react';
import { Blog } from '@/util/AppTypes';
import styles from "./page.module.css";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faMinus } from '@fortawesome/free-solid-svg-icons';

export const BlogComp = ({ blog }: { blog: Blog }) => {

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
                <p>{ blog.postedTime }</p>
            </div>
            <div className={`${styles.blogContent} x-axis-flex`}>
                <div>
                    <h2 title="title">{ blog.title }</h2>
                    <p>{ blog.description }</p>
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
