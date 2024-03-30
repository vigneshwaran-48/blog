import React from 'react'
import OrganizationCompSkeleton from './components/OrganizationCompSkeleton';
import styles from "./skeleton.module.css";

const loading = () => {

    let content = [];
    for(let i = 0;i < 7;i ++) {
        content.push(<OrganizationCompSkeleton />);
    }
    return (
        <div className={`${styles.skeletonContainer} hide-scrollbar full-body y-axis-flex`}>
            { content }
        </div>
    )
}

export default loading;