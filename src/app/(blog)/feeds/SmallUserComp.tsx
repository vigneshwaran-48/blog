import { UserMeta } from '@/util/AppTypes';
import Image from 'next/image';
import React from 'react'

const SmallUserComp = ({ user }: { user: UserMeta }) => {

    const { image, name, description } = user;

    return (
        <div className="flex items-center p-2">
            <Image 
                    src={image || "/person.jpg"} 
                    width={25} 
                    height={25} 
                    alt="Most Followed user" 
                    className="rounded-full mr-1"
                />
            <div className="flex flex-col">
                <p className="font-bold">{ name }</p> 
                <p className="text-[14px] text-[--app-light-text-color]">{ description }</p>
            </div>
        </div>
    )
}

export default SmallUserComp;