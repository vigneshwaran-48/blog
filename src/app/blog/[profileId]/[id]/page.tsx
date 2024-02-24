import { getBlogOfProfile, getLikesOfBlog } from '@/app/actions/blog';
import { Blog } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import BlogUserDetails from './BlogUserDetails';
import { Metadata } from 'next';
import BlogOptions from './BlogOptions';

interface Props {
    params: { id: number, profileId: string }
}

export async function generateMetadata({ params: { id, profileId } }: Props): Promise<Metadata> {

    const blog: Blog = await getBlogOfProfile(id, profileId);

    return {
        title: `${blog.title}`,
        description: `${blog.title} page`
    }
}

const page = async ({ params: { id, profileId } }: Props) => {

    const [ blog, likesOfBlog ] = await Promise.all([ getBlogOfProfile(id, profileId), getLikesOfBlog(id, profileId) ]);
    
    return (
        <div className={`${styles.page} hide-scrollbar y-axis-flex`}>
            <img 
                src={blog.image} 
                alt="Blog Header Image" />
            <BlogUserDetails user={blog.owner} postedOn={blog.displayPostedDate as string}  />
            <BlogOptions likes={likesOfBlog} blogId={id} profileId={profileId} />
            <h1>{ blog.title }</h1>
            <p dangerouslySetInnerHTML={ { __html: blog.content } } />
        </div>
    )
}

export default page;