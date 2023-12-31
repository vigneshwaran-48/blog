import { Metadata } from "next"
import React from "react"
import { AppHeader } from "./components/AppHeader"
import styles from "./page.module.css";
import { NavBar } from "./components/NavBar";

export const metadata : Metadata = {
    title: "Blog",
    description: "Blog app"
}

export default function RootLayout({ children }: { children : React.ReactNode }) {

    return (
        <html lang="en">
            <body className={`full-body`}>
                <AppHeader />
                <div className={`${styles.middleBody} full-width x-axis-flex`}>
                    <NavBar />
                    <main className={styles.main}>
                        { children }
                    </main>
                </div>
            </body>
        </html>
    )
}