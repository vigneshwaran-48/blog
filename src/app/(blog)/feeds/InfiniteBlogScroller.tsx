"use client";

import { Blog } from '@/util/AppTypes';
import React, { useEffect, useRef, useState } from 'react'
import { BlogComp } from '../components/blog/BlogComp';
import { getFeeds } from '@/app/actions/blog';
import CircleLoader from '../components/CircleLoader';

const InfiniteBlogScroller = ({ initialBlogs } : { initialBlogs : Blog[] }) => {

    const [ blogs, setBlogs ] = useState<Blog[]>(initialBlogs);
    const [ page, setPage ] = useState<number>(0);

    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    loadFeeds();
                }
            })
        })
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [page]);

    const loadFeeds = async () => {
        const feeds = await getFeeds(page + 1);
        if(feeds && feeds.length > 0) {
            setPage(prevPage => prevPage + 1);
            setBlogs(prevBlogs => [...prevBlogs, ...feeds]);
        }
    }

    const content = blogs && blogs.map((blog, key) => <BlogComp key={key} blog={blog} />);

    return (
        <div className="items-center w-full max-w-[--app-main-page-max-width] py-10 overflow-scroll hide-scrollbar y-axis-flex">
            { content }
            <div ref={loaderRef}>
                <CircleLoader />
            </div>
        </div>
    )
}

export default InfiniteBlogScroller;