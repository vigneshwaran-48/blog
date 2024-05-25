import { getBlogOfProfile } from '@/app/actions/blog';
import { BlogFeedResponse, BlogViewStats, UserMeta } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import { Metadata } from 'next';
import { AppFields } from '@/util/AppFields';
import BlogPage from './components/BlogPage';
import EmptyBlogPage from './components/EmptyBlogPage';
import Link from 'next/link';
import { getBlogViewStats } from '@/app/actions/blogStats';

interface Props {
    params: { id: string, profileId: string }
}

export async function generateMetadata({ params: { id, profileId } }: Props): Promise<Metadata> {

    const response: BlogFeedResponse = await getBlogOfProfile(id, profileId);
    let blog = response.feed.blog;
    if (response.blogStatus !== "AVAILABLE") {
        blog = { title: "Blog", description: "Blog", owner: {} as UserMeta, image: "", content: "" };
    }

    return {
        title: `${blog.title}`,
        description: `${blog.title} page`
    }
}

const page = async ({ params: { id, profileId } }: Props) => {

    const blogResponse: BlogFeedResponse = await getBlogOfProfile(id, profileId);
    const blogStatsResponse: BlogViewStats = await getBlogViewStats(id);

    let blogStatus = blogResponse.blogStatus;
    let content;

    if (blogStatus === AppFields.PageStatus.AVAILABLE) {
        const { blog, likesOfBlog, comments } = blogResponse.feed;
        content = <BlogPage 
                    viewsCount={blogStatsResponse.viewsCount} 
                    profileId={profileId} 
                    blog={blog} 
                    comments={comments} 
                    likesOfBlog={likesOfBlog} />;
    } else if (blogStatus === AppFields.PageStatus.SIGNUP) {
        content = (
            <div className="relative hide-scrollbar overflow-y-scroll w-full h-full flex">
                <EmptyBlogPage className="absolute" />
                <div className="flex justify-center items-center absolute sm:bg-[#0000004d] right-0 left-0 h-full">
                    <div className="max-w-[500px] shadow-2xl border sm:border-none w-[95%] flex flex-col justify-around items-center bg-[--app-background-color] p-2 rounded">
                        <p className="text-[20px] p-2 text-center">Your daily limit is reached, Signup to read countless blogs!</p>
                        <Link href={`/auth/signin`} className="button bg-[--app-selected-background-color] text-[--app-selected-text-color] inline-block my-[10px]">Signin</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`${styles.page} hide-scrollbar y-axis-flex`}>
            {content}
        </div>
    )
}

export default page;