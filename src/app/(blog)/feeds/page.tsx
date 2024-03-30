import { Blog } from '@/util/AppTypes';
import React from 'react'
import styles from "./page.module.css"
import { BlogComp } from '../components/blog/BlogComp';
import { getFeeds } from '@/app/actions/blog';

const BlogFeeds = async () => {

    const blogs: Blog[] = await getFeeds();

    const feeds = blogs && blogs.map((blog, key) => <BlogComp key={key} blog={blog} />);

    return (
        <div className={`${styles.feeds} x-axis-flex full-body`}>
            <section className={`${styles.blogListing} items-center py-10 overflow-scroll hide-scrollbar y-axis-flex`}>
                { feeds }
            </section>
        </div>
    )
}

export default BlogFeeds;