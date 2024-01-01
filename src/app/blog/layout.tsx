"use client";

import React, { useRef } from "react"
import { AppHeader } from "./components/AppHeader"
import styles from "./page.module.css";
import { NavBar } from "./components/NavBar";
import { AppStore, makeStore } from "@/lib/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children : React.ReactNode }) {

    // Redux store
    const storeRef = useRef<AppStore>();

    if(!storeRef.current) {
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
            <SessionProvider>
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
            </SessionProvider>
        </Provider>
    )
}