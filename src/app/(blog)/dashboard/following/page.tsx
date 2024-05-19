import React from 'react'
import FilterBar from './components/FilterBar';
import FollowingUsersOrganizationsComp from './components/FollowingUsersOrganizationsComp';
import { Metadata } from 'next';
import FollowingTags from './components/FollowingTags';

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Following",
        description: `User's following page`
    }
}

const page = ({ searchParams = {} }: Props) => {

    let isUsers = searchParams["users"] != null; 
    const isTags = searchParams["tags"] != null; 
    const isOrganizations = searchParams["organizations"] != null; 

    if (!isUsers && !isOrganizations && !isTags) {
        isUsers = true;
    }

    return (
        <div className="w-full h-full sm:p-2">
            <FilterBar currentFilter={Object.keys(searchParams)[0] || "users"} />
            <div className="w-full h-[calc(100%-62px)]">
                {
                    isUsers || isOrganizations ? <FollowingUsersOrganizationsComp isUser={isUsers} /> : <FollowingTags />
                }
            </div>
        </div>
    )
}

export default page;