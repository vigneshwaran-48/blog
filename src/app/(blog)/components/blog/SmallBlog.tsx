import { Blog } from '@/util/AppTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const SmallBlog = ({ blog }: { blog: Blog }) => {

    const { title, owner } = blog;

    return (
        <Link href={`/${blog.publishedAt?.profileId}/${blog.id}`}>
            <div className="w-full flex flex-col p-2">
                <div className="flex w-full items-center my-1">
                    <Image 
                        src={owner.image || "/person.jpg"} 
                        alt="Blog owner" 
                        width={25} 
                        height={25} 
                        className="rounded-full mr-1"
                    />
                    <Link href={`/${blog.publishedAt?.profileId}`}>
                        <p className="text-[14px] font-semibold hover:underline">{ owner.name }</p>
                    </Link>
                </div>
                <p className="font-bold pl-2">{ title }</p>
            </div>
        </Link>
    )
}

export default SmallBlog;