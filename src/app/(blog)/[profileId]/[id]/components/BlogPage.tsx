import { Blog, BlogLike, Comment } from '@/util/AppTypes';
import React from 'react'
import BlogUserDetails from './BlogUserDetails';
import BlogOptions from './BlogOptions';
import BlogCommentsSection from './BlogCommentsSection';
import styles from "../page.module.css";

interface Props {
    blog: Blog,
    likesOfBlog: BlogLike[],
    profileId: string,
    comments: Comment[]
}

const BlogPage = ({ blog, likesOfBlog, profileId, comments }: Props) => {

    return (
        <>
            <img 
                src={blog.image} 
                alt="Blog Header Image" />
            <BlogUserDetails user={blog.owner} postedOn={blog.displayPostedDate as string}  />
            <BlogOptions likes={likesOfBlog} blogId={blog.id as string} profileId={blog.publishedAt?.profileId as string} />
            <div className={`${styles.blogContent}`}>
                <h1>{ blog.title }</h1>
                <p dangerouslySetInnerHTML={ { __html: blog.content } } />
            </div>
            <BlogCommentsSection blogId={blog.id as string} profileId={profileId} comments={comments} />
        </>
    )
}

export default BlogPage;