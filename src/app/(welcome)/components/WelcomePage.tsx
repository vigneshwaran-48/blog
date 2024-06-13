import React from 'react';
import Image from 'next/image';

const WelcomePage = () => {
    return (
        <div className={`w-full h-[calc(100%-40px)] flex flex-col items-center`}>
            <div className="flex flex-col">
                <h1 className="my-6 text-center text-5xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-300">
                    Share Your Voice with the World
                </h1>
                <p className="mt-4 text-center text-gray-700 max-w-2xl">
                    Experience seamless blogging with advanced features like organizational roles, user and organization follow notifications, and comprehensive search functionality. Easily create and manage posts, tag content, and connect with a vibrant community.
                </p>
            </div>
            <div className="w-full flex justify-center">
                <Image 
                    src="/welcome/blog-app-feeds.png" 
                    width={100} 
                    height={100} 
                    alt='Blog App Feeds page' 
                    className="max-w-[500px] w-[95%] h-fit my-4"
                />
            </div>
            <div className="w-full">

            </div>
        </div>
    )
}

export default WelcomePage