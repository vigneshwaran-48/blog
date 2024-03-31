import { Blog } from '@/util/AppTypes';
import React from 'react'
import styles from "./page.module.css"
import { getFeeds } from '@/app/actions/blog';
import InfiniteBlogScroller from './InfiniteBlogScroller';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Feeds",
    description: "Blog feeds for the user"
}

const BlogFeeds = async () => {

    const blogs: Blog[] = await getFeeds(0);

    return (
        <div className={`${styles.feeds} x-axis-flex full-body`}>
            <InfiniteBlogScroller initialBlogs={blogs} />
        </div>
    )
}

export default BlogFeeds;