"use client";

import { Blog } from '@/util/AppTypes';
import React from 'react';
import styles from "./profileBlog.module.css";
import { useRouter } from 'next/navigation';

const ProfileBlog = ({ blog, profileId }: { blog: Blog, profileId: string }) => {

    const router = useRouter();

    return (
        <div 
            className={`${styles.blog} y-axis-flex cursor-pointer`}
            onClick={e => router.push(`/${profileId}/${blog.id}`)}
        >
            <img src={blog.image} alt="User Posted Blog" width={100} height={230} className="w-[100px] h-[230px]"  />
            <h2 className="m-2 text-3xl font-bold">{ blog.title }</h2>
        </div>
    )
}

export default ProfileBlog;