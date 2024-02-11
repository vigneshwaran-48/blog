import { getBlogsOfUser } from '@/app/actions/blog';
import { Blog } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import PostedBlog from '../components/blog/PostedBlog';

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