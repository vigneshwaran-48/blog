
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
                {children}
            </body>
        </html>
    )
}

export default layout;