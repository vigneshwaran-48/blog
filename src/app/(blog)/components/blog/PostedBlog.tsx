"use client";

import { Blog } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import BlogContentComp from './BlogContentComp';
import { useRouter } from 'next/navigation';
import BlogMetaHeader from './BlogMetaHeader';
import BlogMetaFooter from './BlogMetaFooter';

const PostedBlog = ({ blog }: { blog: Blog }) => {

    const profileId = blog.publised ? blog.publishedAt?.profileId : blog.owner.profileId;
    const router = useRouter();

    const handleBlogClick = () => {
        router.push(`/${profileId}/${blog.id}`);
    }

    return (
        <article className={`${styles.blogMeta} y-axis-flex`} onClick={handleBlogClick} >
            <BlogMetaHeader 
                ownerName={blog.owner.name as string}
                ownerImage={blog.owner.image as string}
            />
            <BlogContentComp 
                title={blog.title} 
                description={blog.description || ""} 
                image={blog.image} 
            />
            <BlogMetaFooter 
                postedDate={blog.displayPostedDate as string} 
                categories={blog.categories || []}
                blogId={blog.id as string}
            />
        </article>
    )
}

export default PostedBlog;