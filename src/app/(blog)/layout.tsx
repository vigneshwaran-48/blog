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
import { useAppSelector } from "@/lib/hooks";
import { PRIVATE_ROUTES } from "@/util/AppFields";
import { usePathname } from "next/navigation";
import LoginStatusChecker from "./components/providers/LoginStatusChecker";
import LoginPopup from "./components/popup/LoginPopup";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"]
})

export default function RootLayout({ children }: { children : React.ReactNode }) {

    // Redux store
    const storeRef = useRef<AppStore>();
    const pathname = usePathname();

    if(!storeRef.current) {
        storeRef.current = makeStore();
    }

    return (
        <html lang="en">
            <body>
                <Provider store={storeRef.current}>
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
                                    <LoginStatusChecker>
                                        <AppHeader />
                                        <div className={`${styles.middleBody} full-width x-axis-flex`}>
                                            <NavBar />
                                            <main className={`${styles.main} x-axis-flex`}>
                                                { children }
                                            </main>
                                        </div>
                                    </LoginStatusChecker>
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