import Image from 'next/image';
import React from 'react'
import styles from "./page.module.css";

interface Props {
    description: string,
    title: string,
    image: string
}

const BlogContentComp = ({ title, description, image }: Props) => {

    return (
        <div className={`${styles.blogContent} x-axis-flex`}>
            <div>
                <h2 title="title">{ title || "Untitled Blog" }</h2>
                <p>{ description }</p>
            </div>
            <Image 
                src={ image }
                alt="Blog's image"
                width={70}
                height={70}
                className="w-[70px] h-[70px]"
            />
        </div>
    )
}

export default BlogContentComp;