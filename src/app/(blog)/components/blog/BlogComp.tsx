import React from 'react';
import { Blog } from '@/util/AppTypes';
import styles from "./page.module.css";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faMinus } from '@fortawesome/free-solid-svg-icons';
import BlogContentComp from './BlogContentComp';
import { NavLink } from '@/util/NavLink';

export const BlogComp = ({ blog }: { blog: Blog }) => {

    const tags = blog.tags?.map(tag => {
        return (
            <div 
                key={tag.id} 
                className={`${styles.category} text-[14px]`}
                title="category"
            >{ tag.name }</div>
        )
    });

    const title = blog.title.length > 30 ? blog.title.substring(0, 30) + "..." : blog.title;

    return (
        <NavLink className={`${styles.blogMeta} border-b mb-10 h-[180px]`} href={`/${blog.publishedAt?.profileId}/${blog.id}`}>
            <article className={` y-axis-flex`}>
                <div className={`${styles.blogMetaHeader} x-axis-flex`}>
                    <Image 
                        src={blog.owner.image as string} 
                        alt="blogged user"
                        width={24}
                        height={24}
                    />
                    <b><p>{ blog.owner.name || "Untitled Blog" }</p></b>
                    <p>{ blog.displayPostedDate }</p>
                </div>

                <BlogContentComp title={title} description={blog.description || ""} image={blog.image} />
                
                <div className={`${styles.blogFooter} x-axis-flex`}>
                    <div className={`${styles.categoryContainer} hide-scrollbar x-axis-flex`}>
                        { tags }
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
        </NavLink>
    )
}
