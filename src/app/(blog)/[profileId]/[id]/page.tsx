import { getBlogOfProfile } from '@/app/actions/blog';
import { BlogFeedResponse, UserMeta } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import { Metadata } from 'next';
import { AppFields } from '@/util/AppFields';
import BlogPage from './components/BlogPage';
import EmptyBlogPage from './components/EmptyBlogPage';

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

    let blogStatus = blogResponse.blogStatus;
    let content;

    if (blogStatus === AppFields.PageStatus.AVAILABLE) {
        const { blog, likesOfBlog, comments } = blogResponse.feed;
        content = <BlogPage profileId={profileId} blog={blog} comments={comments} likesOfBlog={likesOfBlog} />;
    } else if (blogStatus === AppFields.PageStatus.SIGNUP) {
        content = (
            <div className="relative w-full h-full flex">
                <EmptyBlogPage className="absolute" />
                <div className="absolute bg-[#0000004d] h-[80%] w-[100%] translate-y-[10%]">

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