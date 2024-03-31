import { Metadata } from 'next'
import React from 'react'
import SearchPageComp from './components/SearchPageComp';
import { SearchResult } from '@/util/AppTypes';
import { search } from '@/app/actions/search';
import ResultComp from './components/ResultComp';
import Image from 'next/image';

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {

    const query = searchParams ? searchParams["query"] as string || "Search" : "Search";

    return {
        title: `${query}`,
        description: `${query} results page`
    }
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

    const results: SearchResult = await search(query, typeof (type) === "string" ? type : type?.join(","),
        typeof (searchBy) === "string" ? searchBy : searchBy?.join(","));

    let resultElems;
    if (results && results.entities && results.entities.length > 0) {
        resultElems = results.entities.map((result, key) => <ResultComp
            key={key}
            entityId={result.id}
            name={result.name}
            image={result.image}
            profileId={result.profileId}
            type={result.type} />);
    } else {
        resultElems = (
            <div className="flex flex-col justify-center items-center h-full w-full">
                <Image
                    src={"/empty-result.png"}
                    width={300}
                    height={300}
                    className="h-[250px] w-[250px] -translate-y-10 sm:h-[300px] sm:w-[300px]"
                    alt="Empty search result" />
                <h3 className="text-2xl font-bold w-fit">No Results</h3>
            </div>
        )
    }

    return (
        <SearchPageComp results={resultElems} />
    )

}

export default SearchPage;