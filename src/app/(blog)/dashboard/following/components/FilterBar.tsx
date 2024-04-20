"use client";

import React from 'react'
import Dropdown from '../../../components/form/Dropdown'

const FilterBar = () => {

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
        console.log(`${id} is selected!`)
    }

    return (
        <div className="flex w-full items-center justify-between p-2">
            <h2 className="text-[24px] font-semibold">Following</h2>
            <Dropdown items={items} onSelect={onDropDownSelect} defaultValue="organizations" rightAlign={true} />
        </div>
    )
}

export default FilterBar;