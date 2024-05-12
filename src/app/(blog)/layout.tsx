"use client";

import React, { useRef } from "react"
import { AppHeader } from "./components/AppHeader"
import styles from "./page.module.css";
import { NavBar } from "./components/NavBar";
import { AppStore, makeStore } from "@/lib/store";
import { Provider } from "react-redux";
import PopUpMessageContainer from "./components/popup/PopUpMessageContainer";
import PopupModelProvider from "./components/popup/PopupModelProvider";
import UserStoreProvider from "./components/providers/UserStoreProvider";
import "../globals.css";
import LoginStatusChecker from "./components/providers/LoginStatusChecker";
import LoginPopup from "./components/popup/LoginPopup";
import ThemeProvider from "./components/providers/ThemeProvider";
import localFont from "next/font/local";

const font = localFont({ src: "../fonts/OpenSans-VariableFont_wdth,wght.ttf" });

export default function RootLayout({ children }: { children: React.ReactNode }) {

    // Redux store
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="/app-icon.png"
                    type="image/png"
                    sizes="any"
                />
            </head>
            <body className={font.className}>
                <Provider store={storeRef.current}>
                    <html lang="en">
                        <body className={`full-body ${styles.body} y-axis-flex`}>
                            <PopupModelProvider>
                                <UserStoreProvider>
                                    {/* <LoginStatusChecker> */}
                                        <ThemeProvider>
                                            <AppHeader />
                                            <div className={`${styles.middleBody} full-width x-axis-flex`}>
                                                <NavBar />
                                                <main className={`${styles.main} x-axis-flex`}>
                                                    {children}
                                                </main>
                                            </div>
                                        </ThemeProvider>
                                    {/* </LoginStatusChecker> */}
                                </UserStoreProvider>
                                <PopUpMessageContainer />
                            </PopupModelProvider>
                            <LoginPopup />
                        </body>
                    </html>
                </Provider>
            </body>
        </html>
    )
}