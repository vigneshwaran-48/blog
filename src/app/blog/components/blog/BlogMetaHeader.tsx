import Image from 'next/image';
import React from 'react';
import styles from "./page.module.css";

interface Props {
    ownerName: string,
    ownerImage: string
}

const BlogMetaHeader = ({ ownerName, ownerImage }: Props) => {
    return (
        <div className={`${styles.blogMetaHeader} x-axis-flex`}>
            <Image 
                src={ownerImage} 
                alt="blogged user"
                width={24}
                height={24}
            />
            <b><p>{ ownerName }</p></b>
        </div>
    )
}

export default BlogMetaHeader;