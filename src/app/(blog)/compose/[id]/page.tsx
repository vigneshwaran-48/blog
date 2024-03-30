import { getBlog } from '@/app/actions/blog';
import { Blog } from '@/util/AppTypes';
import React from 'react';
import BlogComposeComp from '../BlogComposeComp';
import { Metadata } from 'next';

interface Props {
    params: { id: string }
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {

    const blog: Blog = await getBlog(id);

    return {
        title: `${blog.title}`,
        description: `${blog.title} editing page`
    }
}

const BlogComposePage = async ({ params: { id } }: Props) => {

    const blog: Blog = await getBlog(id);
    
    return (
        <BlogComposeComp blog={blog} />
    )
}

export default BlogComposePage;