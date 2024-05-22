import { getFollowingTags } from '@/app/actions/tag';
import { Tag } from '@/util/AppTypes';
import Link from 'next/link';
import React from 'react'

const FollowingTags = async () => {

    const followingTags: Tag[] = await getFollowingTags();

    const followoingTagElems = followingTags && followingTags.length > 0 ? followingTags.map((tag, key) => (
        <div 
            key={key} 
            className="w-[250px] h-[175px] flex flex-col items-center justify-center p-4 m-2 border rounded-md transition-all sm:hover:scale-[1.1]"
        >
            <Link 
                href={`/tag/${tag.id}`} 
                className="text-[--app-light-text-color]"
            >
                 <span 
                    className="flex-shrink-0 mr-2 text-[60px] w-[70px] h-[70px] rounded-full bg-[--app-selected-background-color] text-[--app-selected-text-color] flex items-center justify-center"
                >#</span>
            </Link>
            <p className="my-2 font-semibold">{ tag.name }</p>
            <Link 
                href={`/tag/${tag.id}`} 
                className="text-[--app-light-text-color] text-[14px]"
            >{ `#${tag.name}` }</Link>
        </div>
    )) : <h1 className="text-2xl text-center">{`You are not following any Tags`}</h1>

    return (
        <div 
            className="w-full h-full flex flex-wrap items-start justify-center overflow-y-scroll hide-scrollbar"
        >{ followoingTagElems }</div>
    )
}

export default FollowingTags;