import React from 'react';
import styles from "./page.module.css"
import BlogboxSkeleton from '../components/skeleton/BlogboxSkeleton';
import SidebarFeeds from './components/SidebarFeeds';

const loading = () => {
    return (
        <div className={`${styles.feeds} full-body flex`}>
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
            <div className={`${styles.suggestionBar} w-[350px] px-3 py-2 h-full overflow-y-scroll hide-scrollbar`}>
                <section className="mb-2">
                    <h2 className="text-xl font-semibold">Most Liked</h2>
                    <ul className="py-2">
                        {isLoading ? <CircleLoader /> : mostLikedBlogsElems}
                    </ul>
                </section>
                <section className="mb-2">
                    <h2 className="text-xl font-semibold">Most Followed</h2>
                    <ul className="py-2">
                        {isLoading ? <CircleLoader /> : mostFollowedUsersElems}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default loading;