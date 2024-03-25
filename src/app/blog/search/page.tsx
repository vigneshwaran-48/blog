import { Metadata } from 'next'
import React from 'react'
import SearchPageComp from './components/SearchPageComp';
import { SearchResult } from '@/util/AppTypes';
import { search } from '@/app/actions/search';

export const metadata: Metadata = {
    title: "Search",
    description: "Search page of blog app"
}

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

const SearchPage = async ({ searchParams = {} }: Props) => {

    const type = searchParams["type"] || "";
    const searchBy = searchParams["searchBy"] || "";

    const results: SearchResult[] = await search("", typeof(type) === "string" ? type : type?.join(","),
                                               typeof(searchBy) === "string" ? searchBy : searchBy?.join(","));

    console.log(results);
    
    return (
        <SearchPageComp />
    )
    
}

export default SearchPage;