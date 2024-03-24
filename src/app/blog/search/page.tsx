import { Metadata } from 'next'
import React from 'react'
import SearchPageComp from './components/SearchPageComp';

export const metadata: Metadata = {
    title: "Search",
    description: "Search page of blog app"
}

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

const SearchPage = ({ searchParams }: Props) => {

    console.log(searchParams);
    
    return (
        <SearchPageComp />
    )
    
}

export default SearchPage;