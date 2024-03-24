"use client";

import React, { useEffect } from 'react'
import Checkbox from '../../components/form/Checkbox'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Filter, Filters, setFilters, toggleFilter } from '@/lib/features/search/searchSlice';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

const FilterSection = ({ isOpen }: { isOpen: boolean }) => {

    const dispatch = useAppDispatch();
    const searchFilters: Filters = useAppSelector(state => state.searchSlice.filters);

    const searchParams = useSearchParams();

    useEffect(() => {
        handleUrlParams(searchParams);
    }, [searchParams]);

    const sectionMapper = (filters: Filter[]) => {
        return filters.map((filter, key) => 
                    <div key={key} className="mb-2">
                        <Checkbox 
                            id={filter.id} 
                            name={filter.name} 
                            checked={filter.checked}
                            onChange={e => dispatch(toggleFilter(filter.id))}
                        />
                    </div>
                );
    }

    const handleUrlParams = (params: ReadonlyURLSearchParams) => {
        let splitted = [];
        splitted = params.has("type") ? params.get("type")?.split(",") || [] : [];

        const searchBy = params.has("searchBy") ? params.get("searchBy")?.split(",") || [] : [];

        console.log(searchBy)

        splitted = searchBy && splitted.concat(searchBy);
        console.log(splitted);
                
        const filters: Filter[] = [];
        splitted && splitted.forEach(value => {
            const filter = searchFilters.type.find(filter => filter.id === value) 
                            || 
                           searchFilters.searchBy.find(filter => filter.id === value);
            if (filter == null) {
                return;
            }
            const newFilter = { ...filter };
            newFilter.checked = true;
            filters.push(newFilter);
        });
        // console.log(filters);
        dispatch(setFilters(filters));
    }

    const typeSectionElems = sectionMapper(searchFilters.type);
    const searchBySectionElems = sectionMapper(searchFilters.searchBy);

    return (
        <section 
            className={`flex-1 ${isOpen ? "translate-x-0" : "-translate-x-[250%]"} p-2 bg-white left-0 top-0 bottom-0 w-full max-w-48 border-r absolute transition duration-500 sm:relative sm:border-r-0 sm:w-1/4 sm:translate-x-0`}>
            <h2 className={`text-3xl w-full p-2 border-b border-[#c2c1c1] h-fit font-semibold`}>Filters</h2>
            <div className={`flex-1 p-3 border-b border-[#c2c1c1]`}>
                <h2 className={`text-2xl mb-3 font-bold text-gray-500`}>Type</h2>
                { typeSectionElems }
            </div>
            <div className={`flex-1 p-3 border-b border-[#c2c1c1]`}>
                <h2 className={`text-2xl mb-3 font-bold text-gray-500`}>Search By</h2>
                { searchBySectionElems }
            </div>
        </section>
    )
}

type SectionCheckbox = {
    name: string,
    id: string,
    checked: boolean,
    onChange: (id: string) => void
}

export default FilterSection;