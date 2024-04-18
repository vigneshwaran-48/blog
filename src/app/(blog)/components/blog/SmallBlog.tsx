import { Blog } from '@/util/AppTypes';
import Image from 'next/image';
import React from 'react'

const SmallBlog = ({ blog }: { blog: Blog }) => {

    const { title, owner } = blog;

    return (
        <div className="w-full flex flex-col p-2">
            <div className="flex w-full items-center">
                <Image 
                    src={owner.image || "/person.jpg"} 
                    alt="Blog owner" 
                    width={25} 
                    height={25} 
                    className="rounded-full mr-1"
                />
                <p className="text-[14px] font-semibold">{ owner.name }</p>
            </div>
            <p className="font-bold">{ title }</p>
        </div>
    )
}

export default SmallBlog;