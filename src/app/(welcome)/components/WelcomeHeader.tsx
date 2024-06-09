import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const WelcomeHeader = () => {

    return (
        <header className={`w-full flex justify-center`}>
            <nav className="w-full flex justify-between items-center sm:px-[20px]">
                <div className="flex items-center">
                    <Image src="/app-icon.png" width={30} height={30} alt="App icon" />
                    <p className="font-bold text-[24px] ml-1">Blog</p>
                </div>
                <Link href="/feeds">
                    <button className="p-2 bg-[--app-selected-background-color] text-[--app-selected-text-color] rounded">Get Started</button>
                </Link>
            </nav>
        </header>
    )
}

export default WelcomeHeader;