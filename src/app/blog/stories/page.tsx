import { getBlogsOfUser } from '@/app/actions/blog';
import { Blog } from '@/util/AppTypes';
import React from 'react';
import { BlogComp } from '../components/blog/BlogComp';
import styles from "./page.module.css";

const StoriesPage = async () => {

    const blogs: Blog[] = await getBlogsOfUser();

    const blogElems = blogs && blogs.map((blog, key) => <BlogComp key={key} blog={blog} />);
    
    return (
        <div className={`${styles.storiesContainer} hide-scrollbar y-axis-flex`}>
            { blogElems }
        </div>
    )
}

export default StoriesPage;