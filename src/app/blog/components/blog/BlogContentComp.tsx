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
                <h2 title="title">{ title }</h2>
                <p>{ description }</p>
            </div>
            <Image 
                src={ image }
                alt="Blog's image"
                width={115}
                height={115}
            />
        </div>
    )
}

export default BlogContentComp;