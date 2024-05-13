import React from 'react';
import styles from "./page.module.css"
import BlogListingSkeleton from '../components/skeleton/BlogListingSkeleton';
import SidebarSkeleton from '../components/skeleton/SidebarSkeleton';

const loading = () => {
    return (
        <div className={`${styles.feeds} full-body flex`}>
            <BlogListingSkeleton />
            <SidebarSkeleton />
        </div>
    )
}

export default loading;