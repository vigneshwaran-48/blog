import Image from 'next/image';
import React from 'react';
import styles from "./page.module.css";

const OrganizationCompSkeleton = () => {
    return (
        <div
            className={`${styles.organizationComp} ${styles.skeleton} x-axis-flex`}
        >
            <div className={styles.skeletonImage}></div>
            <div className={`${styles.organizationCompNameDesc}`}>
                <h3></h3>
                <p></p>
            </div>
        </div>
    )
}

export default OrganizationCompSkeleton;