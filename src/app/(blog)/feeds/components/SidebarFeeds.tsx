"use client";

import { Blog, UserMeta } from '@/util/AppTypes';
import React, { useEffect, useState } from 'react'
import SmallBlog from '../../components/blog/SmallBlog';
import SmallUserComp from './SmallUserComp';

import styles from "../page.module.css";
import { getMostFollowedUsers } from '@/app/actions/user';
import { getMostLikedBlogs } from '@/app/actions/blog';
import CircleLoader from '../../components/CircleLoader';

const SidebarFeeds = () => {

    const [mostFollowedUsers, setMostFollowedUsers] = useState<UserMeta[]>([]);
    const [mostLikedBlogs, setMostLikedBlogs] = useState<Blog[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        loadData();
    }, []);

    const loadData = async () => {
        setMostFollowedUsers(await getMostFollowedUsers());
        setMostLikedBlogs(await getMostLikedBlogs());
        setIsLoading(false);
    }

    const mostLikedBlogsElems = mostLikedBlogs.map((blog, key) => <SmallBlog blog={blog} key={key} />);
    const mostFollowedUsersElems = mostFollowedUsers.map((user, key) => <SmallUserComp user={user} key={key} />)

    return (
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
    )
}

export default SidebarFeeds;