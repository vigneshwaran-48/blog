"use client";

import { BlogViewStats } from '@/util/AppTypes';
import { LineChart } from '@mui/x-charts';
import React from 'react'

const BlogViewStatsRenderer = ({ allBlogsViewStats }: { allBlogsViewStats: BlogViewStats[] }) => {

    const xAxis = allBlogsViewStats.map((blogViewStats, index) => index);
    const yAxis = allBlogsViewStats.map(blogViewStats => blogViewStats.viewsCount);

    return (
        <div className="w-[280px] h-[180px] sm:w-[480px] sm:h-[280px]">
            <LineChart 
                // xAxis={[{ data: xAxis }]}
                xAxis={[{
                    data: xAxis,
                    valueFormatter: index => allBlogsViewStats[index].title,
                    scaleType: "point"
                }]}
                series={[
                {
                    data: yAxis,
                    area: true,
                    label: "Blog Views"
                },
                ]}
            />
        </div>
    )
}

export default BlogViewStatsRenderer;