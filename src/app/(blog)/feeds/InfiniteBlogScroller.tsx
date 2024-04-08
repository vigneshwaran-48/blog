"use client";

import { Blog } from '@/util/AppTypes';
import React, { useEffect, useRef, useState } from 'react'
import { BlogComp } from '../components/blog/BlogComp';
import { getFeeds } from '@/app/actions/blog';
import CircleLoader from '../components/CircleLoader';
import { useAppDispatch } from '@/lib/hooks';
import { setLoginPopup } from '@/lib/features/user/userSlice';

const InfiniteBlogScroller = ({ initialBlogs, nextPageStatus }: { initialBlogs: Blog[], nextPageStatus: string }) => {

    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [page, setPage] = useState<number>(0);
    const [showSpinner, setShowSpinner] = useState<boolean>(true);
    const [noContentElement, setNoContentElement] = useState<React.ReactNode>("No Content");

    const loaderRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
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

    useEffect(() => {
        if (nextPageStatus === "NOT_AVAILABLE") {
            setShowSpinner(false);
        }
    }, []);

    const loadFeeds = async () => {
        const data = await getFeeds(page + 1);
        const status = data.nextPageStatus;
        const feeds = data.blogs;

        if (feeds && feeds.length > 0) {
            setPage(prevPage => prevPage + 1);
            setBlogs(prevBlogs => [...prevBlogs, ...feeds]);
        }
        if (status === "AVAILABLE") {
            return;
        }
        setShowSpinner(false);
        if (status === "NOT_AVAILABLE") {
           setNoContentElement(<p>No content available!</p>);
        } else if (status === "SIGNUP") {
            setNoContentElement(
                <div className="p-2 flex flex-col items-center justify-center w-[98%] max-w-[500px]">
                    <p className="mb-2">Your daily limit is reached!</p>
                    <button 
                        className="button w-fit bg-[--app-selected-background-color] text-[--app-selected-text-color]"
                        onClick={() => dispatch(setLoginPopup(true))}
                    >Login</button>
                </div>
            )
        }
    }

    const content = blogs && blogs.map((blog, key) => <BlogComp key={key} blog={blog} />);

    return (
        <div className="items-center w-full max-w-[--app-main-page-max-width] py-10 overflow-scroll hide-scrollbar y-axis-flex">
            {content}
            {showSpinner ?
                <div ref={loaderRef}>
                    <CircleLoader />
                </div>
                : noContentElement
            }
        </div>
    )
}

export default InfiniteBlogScroller;