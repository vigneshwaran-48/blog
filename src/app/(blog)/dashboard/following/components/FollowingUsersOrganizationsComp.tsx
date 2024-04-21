import { getFollowingOrganizations, getFollowingUsers } from '@/app/actions/follow';
import { UserMeta } from '@/util/AppTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const FollowingUsersOrganizationsComp = async ({ isUser }: { isUser: boolean }) => {

    const followingData: UserMeta[] = isUser ? await getFollowingUsers() : await getFollowingOrganizations();

    const followoingUserElems = followingData ? followingData.map((user, key) => (
        <div 
            key={key} 
            className="w-[250px] h-[175px] flex flex-col items-center justify-center p-4 m-2 border rounded-md transition-all sm:hover:scale-[1.1]"
        >
            <Link 
                href={`/${user.profileId}`} 
                className="text-[--app-light-text-color]"
            >
                <Image 
                    src={user.image || "/person.jpg"} 
                    alt="Following user" 
                    width={60} 
                    height={60} 
                    className="my-2 rounded-full"
                />
            </Link>
            <p className="my-2 font-semibold">{ user.name }</p>
            <Link 
                href={`/${user.profileId}`} 
                className="text-[--app-light-text-color] tex                                                                                                     t-[14px]"
            >{ `@${user.profileId}` }</Link>
        </div>
    )) : "No content"

    return (
        <div className="w-full h-full flex flex-wrap items-center sm:items-start justify-center overflow-y-scroll hide-scrollbar">
            { followoingUserElems }
        </div>
    )
}

export default FollowingUsersOrganizationsComp;