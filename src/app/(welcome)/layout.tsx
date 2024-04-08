import type { Metadata } from 'next'
import '../globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Welcome page of the blog application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
      <body>{children}</body>
    </html>
  )
}
