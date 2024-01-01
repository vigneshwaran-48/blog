import { Metadata } from 'next'
import React, { useRef } from 'react'
import { Blog } from './components/blog/Blog'
import { BlogMeta } from '@/util/AppTypes'
import styles from "./page.module.css";
import { AppStore, makeStore } from '@/lib/store';
import { Provider } from 'react-redux';
import { useAppSelector, useAppStore } from '@/lib/hooks';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata : Metadata = {
    title: "Home",
    description: "Blog app's home page"
}

export default async function HomePage() {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/api/auth/signin");
    }

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
