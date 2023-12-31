import { Metadata } from 'next'
import React from 'react'
import { Blog } from './components/blog/Blog'
import { BlogMeta } from '@/util/AppTypes'
import styles from "./page.module.css";

export const metadata : Metadata = {
    title: "Home",
    description: "Blog app's home page"
}

export default function HomePage() {

    const content: BlogMeta = {
        title: "Testing",
        postedUser: {
            name: "Vicky",
            image: "/person.jpg"
        },
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, culpa!",
        date: "2nd Jan",
        image: "/welcome-image.png",
        categories: ["learning", "teaching", "tech"]
    }

    return (
        <div className={`${styles.home} x-axis-flex full-body`}>
            <section className={`${styles.blogListing} y-axis-flex`}>
                <Blog blog={content} />
            </section>
        </div>
    )
}
