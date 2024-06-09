import type { Metadata } from 'next'
import '../globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Welcome page of the blog application',
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
              { children }
          </body>
      </html>
  )
}

export default layout;
