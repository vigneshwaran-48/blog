import { Metadata } from "next";
import "../globals.css";
import React from "react";

export const metaData: Metadata = {
  title: "Create You Account",
  description: "Account creation page"
}

const layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <html>
            <head>
                <link
                    rel="icon"
                    href="/app-icon.png"
                    type="image/png"
                    sizes="any"
                />
            </head>
            <body className="flex justify-center items-center">
                {children}
            </body>
        </html>
    )
}

export default layout;
