import React from 'react';
import styles from "./nostories.module.css";
import Link from 'next/link';

const NoStories = () => {
    return (
        <div className={`${styles.noStories} y-axis-flex`}>
            <img 
                src="/create-story.png"
                width={50}
                height={50}
                alt="Create a Story"
            />
            <Link href="/compose">
                <button className={`button`}>Create Story</button>
            </Link>
        </div>
    )
}

export default NoStories;