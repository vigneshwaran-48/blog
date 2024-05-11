import { getBlogsOfUser } from '@/app/actions/blog';
import { Blog } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import PostedBlog from '../components/blog/PostedBlog';
import { Metadata } from 'next';
import NoStories from './NoStories';
import { NavLink } from '@/util/NavLink';
import SidebarFeeds from '../feeds/components/SidebarFeeds';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Stories",
        description: `Stories of the user`
    }
}

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

const StoriesPage = async ({ searchParams = {} }: Props) => {

    const isPublished = searchParams["published"] != null;

    console.log(`Is published ${isPublished}`);

    const blogs: Blog[] = await getBlogsOfUser();

    let blogElems: any = blogs && blogs.length > 0 
                        ? blogs
                            .filter(blog => blog.publised === isPublished)
                            .map((blog, key) => <PostedBlog key={key} blog={blog} />)
                        : <NoStories />;

    if (blogElems.length <= 0) {
        blogElems = <p>No Content!</p>
    }
    
    return (
        <div className={`${styles.storiesPage} full-body flex`}>
            <div className={`${styles.storiesContainer} flex flex-col sm:border-r`}>
                <nav className="flex w-full h-[50px]">
                    <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 button" href="/stories" useStartsWith={false}>UnPublished</NavLink>
                    <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 button" href="/stories?published" useStartsWith={false}>Published</NavLink>
                </nav>
                <div className="w-full h-[calc(100%-50px)] flex flex-col items-center overflow-y-scroll hide-scrollbar">
                    { blogElems }
                </div>
            </div>
            <SidebarFeeds />
        </div>
    )
}

export default StoriesPage;