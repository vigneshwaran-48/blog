import React from 'react'
import FilterBar from './components/FilterBar';
import FollowingUsersOrganizationsComp from './components/FollowingUsersOrganizationsComp';

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

const page = ({ searchParams = {} }: Props) => {

    const isUsers = searchParams["users"] != null; 
    const isTags = searchParams["tags"] != null; 
    const isOrganizations = searchParams["organizations"] != null; 

    return (
        <div className="w-full h-full sm:p-2">
            <FilterBar currentFilter={Object.keys(searchParams)[0] || "users"} />
            <div className="w-full h-[calc(100%-62px)]">
                {
                    isUsers || isOrganizations ? <FollowingUsersOrganizationsComp isUser={isUsers} /> : "Test"
                }
            </div>
        </div>
    )
}

export default page;