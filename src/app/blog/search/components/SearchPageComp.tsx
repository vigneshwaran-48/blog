"use client";

import React, { useState } from 'react'
import FilterSection from './FilterSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from '../../components/blog/SearchBar';

const SearchPageComp = ({ results }: { results?:  React.JSX.Element[] }) => {
    const [ isFilterOpen, setIsFilterOpen ] = useState<boolean>(false);

    return (
        <div className="flex w-full justify-around p-4 relative">
            <FilterSection isOpen={isFilterOpen} />
            <div className="flex-1 w-full sm:w-3/4">
                <div className="flex items-center p-2 sm:hidden">
                    <FontAwesomeIcon 
                        icon={faFilter} 
                        className="mr-2 text-lg cursor-pointer"
                        onClick={e => setIsFilterOpen(prev => !prev)}
                    />
                    <SearchBar />
                </div>
                <div className="flex-1 overflow-scroll">
                    { results }
                </div>
            </div>
        </div>
    )
}

export default SearchPageComp;