"use client";

import React, { useEffect, useRef } from 'react'
import Checkbox from '../../components/form/Checkbox'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Filter, Filters, setFilters, toggleFilter } from '@/lib/features/search/searchSlice';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const FilterSection = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

    const dispatch = useAppDispatch();
    const searchFilters: Filters = useAppSelector(state => state.searchSlice.filters);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        handleUrlParams(searchParams);
    }, [searchParams]);

    useEffect(() => {
        document.body.addEventListener("click", focusOutListener);
        return (() => {
            document.removeEventListener("click", focusOutListener);
        });
    }, []);

    const sectionMapper = (filters: Filter[]) => {
        return filters.map((filter, key) => 
                    <div key={key} className="mb-2">
                        <Checkbox 
                            id={filter.id} 
                            name={filter.name} 
                            checked={filter.checked}
                            onChange={e => handleFilterChange(filter)}
                        />
                    </div>
                );
    }

    const focusOutListener = (e: MouseEvent) => {
        if(sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
            onClose();
        }
    }

    const handleFilterChange = (filter: Filter) => {
        let value = null;
        if(!filter.checked) {
            // If it is false then it will be toggled to true. So, considering it as a applied filter.
            if (searchParams.has(filter.type)) {
                value = `${searchParams.get(filter.type)},${filter.id}`;
            } else {
                value = filter.id;
            }
        } else {
            if (searchParams.has(filter.type)) {
                const splitted = searchParams.get(filter.type)?.split(",").filter(splValue => splValue !== filter.id) || [];
                value = splitted?.join(",");
            }
        }
        const params = new URLSearchParams(searchParams.toString());
        if (!value) {
            params.delete(filter.type);
        } else {
            params.set(filter.type, value);
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleUrlParams = (params: ReadonlyURLSearchParams) => {
        let splitted = [];
        splitted = params.has("type") ? params.get("type")?.split(",") || [] : [];
        const searchBy = params.has("searchBy") ? params.get("searchBy")?.split(",") || [] : [];
        splitted = searchBy && splitted.concat(searchBy);
                
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
        dispatch(setFilters(filters));
    }

    const typeSectionElems = sectionMapper(searchFilters.type);
    const searchBySectionElems = sectionMapper(searchFilters.searchBy);

    return (
        <section 
            ref={sectionRef}
            className={`flex-1 ${isOpen ? "translate-x-0" : "-translate-x-[250%]"} p-2 bg-white left-0 top-0 bottom-0 w-full max-w-48 border-r absolute transition duration-500 sm:relative sm:border-r-0 sm:w-1/4 sm:translate-x-0`}>
            <FontAwesomeIcon 
                icon={faX} 
                className="absolute p-2 right-2 top-2 sm:hidden" 
                onClick={e => onClose()}
            />
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

export default FilterSection;