import { getBlogsOfUser } from '@/app/actions/blog';
import { Blog, UserMeta } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import PostedBlog from '../components/blog/PostedBlog';
import { Metadata } from 'next';
import NoStories from './NoStories';
import { NavLink } from '@/util/NavLink';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Stories",
        description: `Stories of the user`
    }
}

const StoriesPage = async () => {

    const blogs: Blog[] = await getBlogsOfUser();

    const blogElems = blogs && blogs.length > 0 
                        ? blogs.map((blog, key) => <PostedBlog key={key} blog={blog} />)
                        : <NoStories />;
    
    return (
        <div className={`${styles.storiesContainer} hide-scrollbar y-axis-flex`}>
            <nav className="flex w-full h-[50px]">
                <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 button" href="/stories">UnPublished</NavLink>
                <NavLink activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" className="mr-2 button" href="/stories?published">Published</NavLink>
            </nav>
            <div className="w-full h-[calc(100%-50px)]">
                { blogElems }
            </div>
        </div>
    )
}

export default StoriesPage;