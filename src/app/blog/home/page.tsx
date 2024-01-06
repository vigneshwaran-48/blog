import { BlogMeta } from '@/util/AppTypes';
import { authOptions } from '@/util/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import styles from "./page.module.css"
import { Blog } from '../components/blog/Blog';

const BlogHome = async () => {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/api/auth/signin");
    }

    const content: BlogMeta = {
        title: "Testing",
        postedUser: {
            id: "9990",
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

export default BlogHome;