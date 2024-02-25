import { getBlogsOfUser } from '@/app/actions/blog';
import { Blog, UserMeta } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import PostedBlog from '../components/blog/PostedBlog';
import { Metadata } from 'next';
import NoStories from './NoStories';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Stories",
        description: `Stories of the user`
    }
}

const StoriesPage = async () => {

    const blogs: Blog[] = await getBlogsOfUser();

    const blogElems = blogs && blogs.length > 0 
                        ? blogs.map((blog, key) => <PostedBlog key={key} blog={blog} />)
                        : <NoStories />;
    
    return (
        <div className={`${styles.storiesContainer} hide-scrollbar y-axis-flex`}>
            { blogElems }
        </div>
    )
}

export default StoriesPage;