import { Metadata } from 'next'
import React from 'react'
import SearchPageComp from './components/SearchPageComp';
import { SearchResult } from '@/util/AppTypes';
import { search } from '@/app/actions/search';
import ResultComp from './components/ResultComp';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Search",
    description: "Search page of blog app"
}

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

const SearchPage = async ({ searchParams = {} }: Props) => {

    let type = searchParams["type"] || "";
    const searchBy = searchParams["searchBy"] || "";
    const query = searchParams["query"] as string || "";

    if (type === "") {
        type = "ALL";
    }

    const results: SearchResult = await search(query, typeof(type) === "string" ? type : type?.join(","),
                                               typeof(searchBy) === "string" ? searchBy : searchBy?.join(","));

    console.log(results);

    const resultElems = results && results.entities && 
                        results.entities.map((result, key) => <ResultComp 
                                                                key={key} 
                                                                entityId={result.id} 
                                                                name={result.name} 
                                                                image={result.image} 
                                                                profileId={result.profileId}
                                                                type={result.type} />);
    
    return (
        <SearchPageComp results={resultElems} />
    )
    
}

export default SearchPage;