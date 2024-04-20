import React from 'react'
import FilterBar from './components/FilterBar';

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

const page = ({ searchParams = {} }: Props) => {

    const isUsers = searchParams["users"] != null; 
    const isTags = searchParams["tags"] != null; 
    const isOrganizations = searchParams["organizations"] != null; 
    
    return (
        <div className="p-2">
            <FilterBar />
        </div>
    )
}

export default page;