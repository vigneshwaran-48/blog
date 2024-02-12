import { getBlog } from '@/app/actions/blog';
import { Blog } from '@/util/AppTypes';
import React from 'react';
import BlogComposeComp from '../BlogComposeComp';

interface Props {
    params: { id: number }
}

const BlogComposePage = async ({ params: { id } }: Props) => {

    const blog: Blog = await getBlog(id);

    return (
        <BlogComposeComp blog={blog} />
    )
}

export default BlogComposePage;