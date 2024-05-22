import { getAllBlogsOfTag, getFollowingTags, getTagById } from '@/app/actions/tag'
import { Blog, Tag } from '@/util/AppTypes';
import React from 'react'
import { BlogComp } from '../../components/blog/BlogComp';
import SidebarFeeds from '../../feeds/components/SidebarFeeds';
import FollowButtons from './FollowButtons';

interface Props {
    params: { tagId: string }
}

const page = async ({ params: { tagId } }: Props) => {
    
    const blogs: Blog[] = await getAllBlogsOfTag(tagId);
    const tag: Tag = await getTagById(tagId);
    const followingTags: Tag[] = await getFollowingTags();

    const isFollowing = followingTags.findIndex(tag => tag.id === tagId) >= 0;

    const blogElems = blogs && blogs.length > 0 
                ? blogs.map((blog, key) => <BlogComp key={key} blog={blog} />) : <p>No blogs applied this tag!</p>;

    return (
        <div className={`pt-[10px] sm:pt-[--app-main-page-padding-top] justify-center full-body flex`}>
            <div className='flex flex-col items-center w-full sm:w-[calc(100%-350px)] h-full'>
                <div className="max-w-[850px] flex w-full mb-2 items-center p-2">
                    <span 
                        className="flex-shrink-0 mr-2 text-[60px] w-[70px] h-[70px] rounded-full bg-[--app-selected-background-color] text-[--app-selected-text-color] flex items-center justify-center"
                    >#</span>
                    <div className="flex sm:flex-grow flex-col">
                        <h1 className="text-4xl font-bold">{ tag.name }</h1>
                        <p>{ tag.description }</p>
                    </div>
                    <div className="">
                        {
                            <FollowButtons tagId={tagId} isFollowing={isFollowing} />
                        }
                    </div>
                </div>
                { blogElems }
            </div>
            <SidebarFeeds />
        </div>
    )
}

export default page;