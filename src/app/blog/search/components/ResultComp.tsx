import { SearchResult, SearchType } from '@/util/AppTypes';
import Image from 'next/image';
import React from 'react'

export type Props = {
    name: string,
    image: string,
    type: SearchType
}

const ResultComp = ({ name, image, type }: Props ) => {
    
    return (
        <div className="w-full h-fit flex align-middle p-7">
            <Image 
                src={image}
                alt="search result image"
                width={40}
                height={40}
                className="w-14 h-14 rounded-full"
            />
            <div>
                <p>{ name }</p>
                <b><p>{ type }</p></b>
            </div>
        </div>
    )
}

export default ResultComp;