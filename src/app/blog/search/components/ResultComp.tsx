import { SearchResult, SearchType } from '@/util/AppTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export type Props = {
    name: string,
    image: string,
    type: SearchType,
    profileId?: string,
    entityId: string
}

const ResultComp = ({ name, image, type, profileId, entityId }: Props ) => {

    let link;

    switch(type) {
        case "BLOG":
            link = `/blog/${profileId}/${entityId}`;
            break;
        case "ORGANIZATION":
        case "USER":
            link = `/blog/${profileId}`;
            break;
        default:
            throw new Error("Unknown type");
    }
    
    return (
        <Link href={link} className="w-full h-fit">
            <div className="w-full h-fit border-b rounded transition duration-500 flex align-middle p-7 hover:bg-[var(--app-light-background-color)] sm:border-none)]">
                <Image 
                    src={image}
                    alt="search result image"
                    width={40}
                    height={40}
                    className="w-14 mr-2 h-14 rounded-full"
                />
                <div>
                    <p className="text-1xl p-1 font-semibold">{ name }</p>
                    <b><p className="text-xs p-1">{ type }</p></b>
                </div>
            </div>
        </Link>
    )
}

export default ResultComp;