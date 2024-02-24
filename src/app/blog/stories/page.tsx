import { getBlogsOfUser } from '@/app/actions/blog';
import { Blog, UserMeta } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import PostedBlog from '../components/blog/PostedBlog';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Stories",
        description: `Stories of the user`
    }
}

const StoriesPage = async () => {

    const blogs: Blog[] = await getBlogsOfUser();

    const blogElems = blogs && blogs.map((blog, key) => <PostedBlog key={key} blog={blog} />);
    
    return (
        <div className={`${styles.storiesContainer} hide-scrollbar y-axis-flex`}>
            { blogElems }
        </div>
    )
}

export default StoriesPage;