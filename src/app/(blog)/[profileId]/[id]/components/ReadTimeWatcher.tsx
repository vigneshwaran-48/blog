"use client";

import React, { useEffect, useRef } from 'react'

const ReadTimeWatcher = ({ blogId }: { blogId: string }) => {

    const enterTime = useRef<number>(0);

    useEffect(() => {
        enterTime.current = new Date().getTime();

        const handleRouteChange = () => {
            const leaveTime = new Date().getTime();
            const readTime = leaveTime - enterTime.current;

            console.log(`Read time ${readTime}`);
            // setBlogReadTime(blogId, readTime);
        }

        window.addEventListener('beforeunload', handleRouteChange);

        return () => {
            console.log("Unmounting!")
            window.removeEventListener('beforeunload', handleRouteChange);
        };
    }, [blogId]);

    return (
        <div></div>
    )
}

export default ReadTimeWatcher;