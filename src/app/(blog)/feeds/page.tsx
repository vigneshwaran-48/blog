import { Blog, UserMeta } from '@/util/AppTypes';
import React from 'react'
import styles from "./page.module.css"
import { getFeeds, getFollowingFeeds } from '@/app/actions/blog';
import InfiniteBlogScroller from './InfiniteBlogScroller';
import { Metadata } from 'next';
import { NavLink } from '@/util/NavLink';
import SmallBlog from '../components/blog/SmallBlog';
import { getAllUsers } from '@/app/actions/user';
import SmallUserComp from './SmallUserComp';

export const metadata: Metadata = {
    title: "Feeds",
    description: "Blog feeds for the user"
}

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

const BlogFeeds = async ({ searchParams = {} }: Props) => {

    const isFollowing = searchParams["following"] != null;

    const data = isFollowing ? await getFollowingFeeds(0) : await getFeeds(0);
    const blogs: Blog[] = data.blogs || [];
    const nextPageStatus: string = data.nextPageStatus;

    // Just for testing need to remove this and move to a client component and loaded it there async. 
    // Otherwise this will impact page loading.
    const users: UserMeta[] = await getAllUsers();

    const mostLikedBlogsElems = blogs.map((blog, key) => <SmallBlog blog={blog} key={key} />);
    const mostFollowedUsers = users.map((user, key) => <SmallUserComp user={user} key={key} />)

    return (
        <div className={`${styles.feeds} full-body flex`}>
            <div className={`${styles.feedsPage} flex flex-col border-r`}>
                <nav className="p-2 flex w-full h-[50px]">
                    <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 h-fit p-1 rounded-sm" href="/feeds" useStartsWith={false}>Feeds</NavLink>
                    <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 h-fit p-1 rounded-sm" href="/feeds?following">Following</NavLink>
                    <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 h-fit p-1 rounded-sm" href="/feeds?type=react">React</NavLink>
                </nav>
                <div className="w-full h-[calc(100%-50px)]">
                    <InfiniteBlogScroller initialBlogs={blogs} nextPageStatus={nextPageStatus} />
                </div>
            </div>
            <div className={`${styles.suggestionBar} w-[350px] px-3 py-2 h-full overflow-y-scroll hide-scrollbar`}>
                <section className="mb-2">
                    <h2 className="text-xl font-semibold">Most Liked</h2>
                    <ul className="py-2">
                        { mostLikedBlogsElems }
                    </ul>
                </section>
                <section className="mb-2">
                    <h2 className="text-xl font-semibold">Most Followed</h2>
                    <ul className="py-2">
                        { mostFollowedUsers }
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default BlogFeeds;