import { getAllBlogsViewStats } from '@/app/actions/blogStats';
import { BlogViewStats } from '@/util/AppTypes';
import { LineChart } from '@mui/x-charts';
import React from 'react'
import BlogViewStatsRenderer from './components/BlogViewStatsRenderer';
import UserViewStatsRemderer from './components/UserViewStatsRemderer';

const BlogViewStatsContainer = async () => {
    
    const allBlogViewStats: BlogViewStats[] = await getAllBlogsViewStats();

    return (
        <div className="w-full h-full flex flex-wrap">
            <BlogViewStatsRenderer allBlogsViewStats={allBlogViewStats} />
            <UserViewStatsRemderer allBlogsViewStats={allBlogViewStats} />
        </div>
    )
}

export default BlogViewStatsContainer;