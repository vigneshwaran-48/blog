import { Blog, UserMeta } from '@/util/AppTypes';
import React from 'react'
import styles from "./page.module.css"
import { getFeeds, getFollowingFeeds, getMostLikedBlogs } from '@/app/actions/blog';
import InfiniteBlogScroller from './components/InfiniteBlogScroller';
import { Metadata } from 'next';
import { NavLink } from '@/util/NavLink';
import SmallBlog from '../components/blog/SmallBlog';
import { getAllUsers, getMostFollowedUsers } from '@/app/actions/user';
import SmallUserComp from './components/SmallUserComp';
import SidebarFeeds from './components/SidebarFeeds';

export const metadata: Metadata = {
    title: "Feeds",
    description: "Blog feeds for the user"
}

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

const BlogFeeds = async ({ searchParams = {} }: Props) => {

    const isFollowing = searchParams["following"] != null;

    let data = isFollowing ? await getFollowingFeeds(0) : await getFeeds(0);
    const blogs: Blog[] = data.blogs || [];
    const nextPageStatus: string = data.nextPageStatus;

    return (
        <div className={`${styles.feeds} full-body flex`}>
            <div className={`${styles.feedsPage} flex flex-col sm:border-r`}>
                <nav className="p-2 flex w-full h-[50px]">
                    <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 h-fit p-1 rounded-sm" href="/feeds" useStartsWith={false}>Feeds</NavLink>
                    <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 h-fit p-1 rounded-sm" href="/feeds?following">Following</NavLink>
                    <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 h-fit p-1 rounded-sm" href="/feeds?type=react">React</NavLink>
                </nav>
                <div className="w-full h-[calc(100%-50px)]">
                    <InfiniteBlogScroller initialBlogs={blogs} nextPageStatus={nextPageStatus} />
                </div>
            </div>
            <SidebarFeeds />
        </div>
    )
}

export default BlogFeeds;