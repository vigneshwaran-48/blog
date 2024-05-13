import Image from 'next/image';
import React from 'react'

const DolphinLoader = () => {
    return (
        <Image 
            src="/blog-app-loader.gif" 
            width={100} 
            height={100} 
            alt="Loader with two dolphins" 
            className="w-[95%] h-[95%] max-w-[250px] max-h-[250px]"
        />
    )
}

export default DolphinLoader;