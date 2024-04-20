"use client";

import React from 'react'
import Dropdown from '../../../components/form/Dropdown'
import { useRouter } from 'next/navigation';

const FilterBar = ({ currentFilter }: { currentFilter: string }) => {

    const router = useRouter();

    const items = [
        {
            id: "users",
            displayName: "Users"
        },
        {
            id: "organizations",
            displayName: "Organizations"
        },
        {
            id: "tags",
            displayName: "Tags"
        }
    ]

    const onDropDownSelect = (id: string) => {
        router.push(`/dashboard/following?` + id);
    }

    return (
        <div className="flex w-full items-center justify-between p-2">
            <h2 className="text-[20px] sm:text-[24px] font-semibold">Following</h2>
            <Dropdown items={items} onSelect={onDropDownSelect} defaultValue={currentFilter} rightAlign={true} />
        </div>
    )
}

export default FilterBar;