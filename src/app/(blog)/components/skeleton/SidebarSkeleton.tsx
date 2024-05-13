import React from 'react'
import SmallBlogSkeleton from './SmallBlogSkeleton';
import styles from "../../feeds/page.module.css";

const SidebarSkeleton = () => {
    return (
        <div className={`${styles.suggestionBar} w-[350px] px-3 py-2 h-full overflow-y-scroll hide-scrollbar`}>
            <section className="mb-2">
                <h2 className="text-xl font-semibold">Most Liked</h2>
                <ul className="py-2">
                    <SmallBlogSkeleton />
                    <SmallBlogSkeleton />
                    <SmallBlogSkeleton />
                </ul>
            </section>
            <section className="mb-2">
                <h2 className="text-xl font-semibold">Most Followed</h2>
                <ul className="py-2">
                    <SmallBlogSkeleton />
                    <SmallBlogSkeleton />
                    <SmallBlogSkeleton />
                </ul>
            </section>
        </div>
    )
}

export default SidebarSkeleton;