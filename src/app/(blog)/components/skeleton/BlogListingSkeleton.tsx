import React from 'react'
import BlogboxSkeleton from './BlogboxSkeleton';
import styles from "../../feeds/page.module.css";

const BlogListingSkeleton = () => {
    return (
        <div className={`${styles.feedsPage} flex flex-col sm:border-r`}>
            <nav className="p-2 flex w-full h-[50px] mr-2">
                <span className="w-[51px] h-[32px] mr-2 bg-[--app-light-background-color] rounded-sm"></span>
                <span className="w-[51px] h-[32px] mr-2 bg-[--app-light-background-color] rounded-sm"></span>
                <span className="w-[51px] h-[32px] mr-2 bg-[--app-light-background-color] rounded-sm"></span>
            </nav>
            <div className="w-full h-[calc(100%-50px)]">
                <div className="items-center w-full max-w-[--app-main-page-max-width] py-10 overflow-scroll hide-scrollbar y-axis-flex">
                    <BlogboxSkeleton />
                    <BlogboxSkeleton />
                    <BlogboxSkeleton />
                </div>
            </div>
        </div>
    )
}

export default BlogListingSkeleton;