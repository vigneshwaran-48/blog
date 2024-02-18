"use client";

import { Blog } from '@/util/AppTypes';
import Image from 'next/image';
import React from 'react';
import styles from "./page.module.css";
import BlogContentComp from './BlogContentComp';
import PostedBlogMoreOptions from './PostedBlogMoreOptions';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

const PostedBlog = ({ blog }: { blog: Blog }) => {

    // For now getting the user profile Id. But once the posting blogs from organization enabled.
    // Need to chnage this logic for using profileId of both organization and user.
    const profileId = useAppSelector(state => state.userSlice.profileId);

    const router = useRouter();

    const categories = blog.categories?.map(category => {
        return (
            <div 
                key={category} 
                className={styles.category}
                title="category"
            >{ category }</div>
        )
    });

    const handleBlogClick = () => {
        router.push(`/blog/${profileId}/${blog.id}`);
    }

    return (
        <article className={`${styles.blogMeta} y-axis-flex`} onClick={handleBlogClick} >
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
                <div className={`${styles.otherActionsContainer} x-axis-flex`} onClick={e => e.stopPropagation()}>
                    <PostedBlogMoreOptions id={blog.id as number} />
                </div>
            </div>
        </article>
    )
}

export default PostedBlog;