"use client";

import { BlogViewStats } from '@/util/AppTypes';
import { LineChart } from '@mui/x-charts';
import React from 'react'

const UserViewStatsRemderer = ({ allBlogsViewStats }: { allBlogsViewStats: BlogViewStats[] }) => {

    const timeVsUsers: { [key: number]: string[] } = {}

    for (const allBlogsView of allBlogsViewStats) {
        for (const element of allBlogsView.blogViews) {
            const blogView = element;
            console.log(blogView)
            const date = new Date(new Date(blogView.viewedTime).toDateString());
            if (timeVsUsers[date.getTime()]) {
                if (timeVsUsers[date.getTime()].findIndex(id => id === blogView.user.id) < 0) {
                    timeVsUsers[date.getTime()].push(blogView.user.id);
                }
                continue;
            }
            timeVsUsers[date.getTime()] = [blogView.user.id];
        }
    }

    return (
        <div className="w-[280px] h-[180px] sm:w-[480px] sm:h-[280px]">
            <LineChart 
                xAxis={[{
                    data: Object.keys(timeVsUsers).reverse(),
                    scaleType: "point",
                    valueFormatter: (time) => new Date(parseInt(time)).toDateString()
                }]}
                series={[{
                    data: Object.values(timeVsUsers).map(ids => ids.length).reverse(),
                    area: true,
                    label: "User Views",
                }]}
            />
        </div>
    )
}

export default UserViewStatsRemderer;