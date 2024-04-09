import React from 'react';
import "../globals.css";

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
            <body className="flex justify-center items-center p-4">
                <main className="flex flex-col border items-center rounded-2xl overflow-hidden w-full h-full max-h-[700px] max-w-[500px]">
                    <h1 className="text-4xl font-semibold p-2">Sign In</h1>
                    <div className="w-full h-[calc(100%-60px)]">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    )
}

export default layout;