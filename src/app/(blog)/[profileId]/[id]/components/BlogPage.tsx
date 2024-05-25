import { Blog, BlogLike, Comment } from '@/util/AppTypes';
import React from 'react'
import BlogUserDetails from './BlogUserDetails';
import BlogOptions from './BlogOptions';
import BlogCommentsSection from './BlogCommentsSection';
import styles from "../page.module.css";
import Link from 'next/link';
import ReadTimeWatcher from './ReadTimeWatcher';
import { setBlogView } from '@/app/actions/blogStats';

interface Props {
    blog: Blog,
    likesOfBlog: BlogLike[],
    profileId: string,
    comments: Comment[],
    viewsCount: number
}

const BlogPage = ({ blog, likesOfBlog, profileId, comments, viewsCount }: Props) => {

    const tagsElems = blog.tags && blog.tags.length > 0 ? blog.tags.map(tag =>
            <Link key={tag.id} href={`/tag/${tag.id}`}>
                <p  
                    className="text-[14px] flex-shrink-0 mr-2 font-semibold p-1 transition-all rounded hover:underline"
                >#{tag.name}</p>
            </Link>
    ) : "";

    setBlogView(profileId, blog.id as string);

    return (
        <>
            <ReadTimeWatcher blogId={blog.id as string} />
            <img 
                src={blog.image} 
                alt="Blog Header Image" />
            <BlogUserDetails user={blog.owner} postedOn={blog.displayPostedDate as string}  />
            <BlogOptions 
                viewsCount={viewsCount} 
                likes={likesOfBlog} 
                blogId={blog.id as string} 
                profileId={blog.publishedAt?.profileId as string} 
                commentsCount={comments.length}
            />
            <div className={`${styles.blogContent}`}>
                <h1 className="text-4xl font-bold">{ blog.title }</h1>
                <div className="flex flex-wrap p-1">
                    { tagsElems }
                </div>
                <p dangerouslySetInnerHTML={ { __html: blog.content } } />
            </div>
            <BlogCommentsSection blogId={blog.id as string} profileId={profileId} comments={comments} />
        </>
    )
}

export default BlogPage;