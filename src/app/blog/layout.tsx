"use client";

import React, { useEffect, useRef } from "react"
import { AppHeader } from "./components/AppHeader"
import styles from "./page.module.css";
import { NavBar } from "./components/NavBar";
import { AppStore, makeStore } from "@/lib/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"]
})

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
                    <style jsx global>{`
                        *{
                            font-family: ${roboto.style.fontFamily};
                            font-style: ${roboto.style.fontStyle};
                        }
                    `}
                    </style>
                    <body className={`full-body ${styles.body} y-axis-flex`}>
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