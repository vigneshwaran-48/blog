"use client";

import React from 'react'
import FilterSection from './components/FilterSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from '../components/blog/SearchBar';
import { MagnifyingGlass } from 'react-loader-spinner';

const loading = () => {

    return (
        <div className="flex w-full max-w-[1000px] justify-around p-4 relative sm:pt-[--app-main-page-padding-top]">
            <FilterSection isOpen={false} onClose={() => { }} />
            <div className="flex-1 w-full sm:w-3/4">
                <div className="flex h-1/6 items-center p-2 sm:hidden">
                    <FontAwesomeIcon
                        icon={faFilter}
                        className="mr-2 text-lg cursor-pointer"
                    />
                    <SearchBar value={""} />
                </div>
                <div className="flex flex-col h-5/6 items-center justify-center sm:h-full">
                    <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="magnifying-glass-loading"
                        wrapperStyle={{}}
                        wrapperClass="magnifying-glass-wrapper"
                        glassColor="#c0efff"
                        color="#e15b64"
                    />
                </div>
            </div>
        </div>
    )
}

export default loading;