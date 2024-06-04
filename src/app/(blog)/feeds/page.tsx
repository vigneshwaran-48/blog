import { Blog, Tag } from '@/util/AppTypes';
import React from 'react'
import styles from "./page.module.css"
import { getFeeds, getFollowingFeeds } from '@/app/actions/blog';
import InfiniteBlogScroller from './components/InfiniteBlogScroller';
import { Metadata } from 'next';
import { NavLink } from '@/util/NavLink';
import SidebarFeeds from './components/SidebarFeeds';
import { getAllBlogsOfTagForFeeds, getFollowingTags } from '@/app/actions/tag';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Feeds",
    description: "Blog feeds for the user"
}

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

const BlogFeeds = async ({ searchParams = {} }: Props) => {

    const followingTags: Tag[] = await getFollowingTags();
    const followintTagElems = followingTags && followingTags.length > 0 && followingTags.map(tag => (
        <NavLink key={tag.id} activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 h-fit p-1 rounded-sm flex-shrink-0" href={`/feeds?tag=${tag.name}`} replacePlus={true}>{ tag.name }</NavLink>
    ));

    const isFollowing = searchParams["following"] != null;
    let followingTag: any = searchParams["tag"];

    if (followingTag != null && followingTags.filter(tag => tag.name === decodeURI(followingTag)).length < 1) {
        redirect("/feeds");
    }

    let data;

    if (isFollowing) {
        data = await getFollowingFeeds(0);
    } else if (followingTag != null) {
        data = await getAllBlogsOfTagForFeeds(followingTag as string, 0);
    } else {
        data = await getFeeds(0);
    }
    const blogs: Blog[] = data.blogs || [];
    const nextPageStatus: string = data.nextPageStatus;

    return (
        <div className={`${styles.feeds} full-body flex`}>
            <div className={`${styles.feedsPage} flex flex-col sm:border-r`}>
                <nav className="p-2 flex w-full sm:w-fit h-[50px] overflow-x-scroll hide-scrollbar border-b">
                    <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 h-fit p-1 rounded-sm" href="/feeds" useStartsWith={false}>Feeds</NavLink>
                    <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 h-fit p-1 rounded-sm" href="/feeds?following">Following</NavLink>
                    { followintTagElems }
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