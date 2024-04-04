"use client";

import React, { useRef } from "react"
import { AppHeader } from "./components/AppHeader"
import styles from "./page.module.css";
import { NavBar } from "./components/NavBar";
import { AppStore, makeStore } from "@/lib/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Roboto } from "next/font/google";
import PopUpMessageContainer from "./components/popup/PopUpMessageContainer";
import PopupModelProvider from "./components/popup/PopupModelProvider";
import UserStoreProvider from "./components/providers/UserStoreProvider";
import "../globals.css";

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
        <html lang="en">
            <body>
                <Provider store={storeRef.current}>
                    {/* <SessionProvider> */}
                        <html lang="en">
                            <style jsx global>{`
                                *{
                                    font-family: ${roboto.style.fontFamily};
                                    font-style: ${roboto.style.fontStyle};
                                }
                            `}
                            </style>
                            <body className={`full-body ${styles.body} y-axis-flex`}>
                                <PopupModelProvider>
                                    <UserStoreProvider>
                                            <AppHeader />
                                            <div className={`${styles.middleBody} full-width x-axis-flex`}>
                                                <NavBar />
                                                <main className={`${styles.main} x-axis-flex`}>
                                                    { children }
                                                </main>
                                            </div>
                                    </UserStoreProvider>
                                <PopUpMessageContainer />
                                </PopupModelProvider>
                            </body>
                        </html>
                    {/* </SessionProvider> */}
                </Provider>
            </body>
        </html>
    )
}