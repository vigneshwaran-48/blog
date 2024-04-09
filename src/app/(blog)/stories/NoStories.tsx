import React from 'react';
import styles from "./nostories.module.css";
import Link from 'next/link';
import { NavLink } from '@/util/NavLink';

const NoStories = () => {
    return (
        <div className={`${styles.noStories} y-axis-flex`}>
            <img 
                src="/create-story.png"
                width={50}
                height={50}
                alt="Create a Story"
            />
            <NavLink href="/compose">
                <button className={`button`}>Create Story</button>
            </NavLink>
        </div>
    )
}

export default NoStories;