"use client";

import React, { useState } from 'react'
import FilterSection from './FilterSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from '../../components/blog/SearchBar';
import { useAppDispatch } from '@/lib/hooks';
import { setQuery } from '@/lib/features/search/searchSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SearchPageComp = ({ results }: { results?:  React.JSX.Element[] | React.JSX.Element }) => {

    const [ isFilterOpen, setIsFilterOpen ] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const onSearch = (query: string) => {
        dispatch(setQuery(query));
        const params = new URLSearchParams(searchParams);
        params.set("query", query);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex w-full max-w-[1000px] justify-around p-4 relative sm:pt-[--app-main-page-padding-top]">
            <FilterSection isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
            <div className="flex-1 w-full sm:w-3/4">
                <div className="flex h-1/6 items-center p-2 sm:hidden">
                    <FontAwesomeIcon 
                        icon={faFilter} 
                        className="mr-2 text-lg cursor-pointer"
                        onClick={e => setIsFilterOpen(prev => !prev)}
                    />
                    <SearchBar 
                        onSearch={onSearch} />
                </div>
                <div className="flex-1 h-5/6 overflow-scroll hide-scrollbar sm:h-full">
                    { results }
                </div>
            </div>
        </div>
    )
}

export default SearchPageComp;