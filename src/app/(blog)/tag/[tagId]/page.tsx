import { getAllBlogsOfTag, getTagById } from '@/app/actions/tag'
import { Blog } from '@/util/AppTypes';
import React from 'react'

interface Props {
    params: { tagId: string }
}

const page = async ({ params: { tagId } }: Props) => {
    
    const blogs: Blog[] = await getAllBlogsOfTag(tagId);

    console.log(blogs)

    return (
        <div>page</div>
    )
}

export default page;