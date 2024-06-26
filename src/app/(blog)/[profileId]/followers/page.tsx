import { getFollowersOfProfile } from '@/app/actions/follow'
import { UserMeta } from '@/util/AppTypes';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
    params: { profileId: string }
}

export async function generateMetadata({ params: { profileId } }: Props): Promise<Metadata> {
    return {
        title: `${profileId}'s followers`,
        description: `${profileId}'s followers page`
    }
}

const page = async ({ params: { profileId } }: Props) => {
    
    const followers: UserMeta[] = await getFollowersOfProfile(profileId);

    const followerElems = followers && followers.map((follower, key) => (
        <div key={key} className="flex items-center w-full justify-between max-w-[400px] p-2">
            <Image 
                src={follower.image as string} 
                alt="Follower image" 
                width={40} 
                height={40}
                className="rounded-full"    
            />
            <b className="flex-grow ml-[5px]"><p className="text-[20px]">{ follower.name }</p></b>
            <Link href={`/${follower.profileId}`} className="button bg-[--app-selected-background-color] text-[--app-selected-text-color]">View</Link>
        </div>
    ))
    
    return (
        <div className="p-2 flex flex-col items-center w-full h-full pt-[10px] max-w-[--app-main-page-max-width] sm:pt-[--app-main-page-padding-top]">
            <div className="flex items-center">
                <Link href={`/${profileId}`}>
                    <FontAwesomeIcon className="text-[24px] mb-2" icon={faArrowLeftLong} />
                </Link>
                <h1 className="text-2xl sm:text-3xl border-b mb-2 p-2">Followers of <b>{ profileId }</b></h1>
            </div>
            <div className="flex flex-col items-center p-2 w-full h-[calc(100%-55px)] overflow-y-scroll hide-scrollbar">
                { followerElems }
            </div>
        </div>
    )
}

export default page;