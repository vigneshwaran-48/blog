import { Blog } from '@/util/AppTypes';
import { authOptions } from '@/util/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import styles from "./page.module.css"
import { BlogComp } from '../components/blog/BlogComp';
import { getFeeds } from '@/app/actions/blog';

const BlogHome = async () => {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/api/auth/signin");
    }

    const blogs: Blog[] = await getFeeds();

    const feeds = blogs && blogs.map((blog, key) => <BlogComp key={key} blog={blog} />);

    return (
        <div className={`${styles.home} x-axis-flex full-body`}>
            <section className={`${styles.blogListing} py-10 overflow-scroll hide-scrollbar y-axis-flex`}>
                { feeds }
            </section>
        </div>
    )
}

export default BlogHome;