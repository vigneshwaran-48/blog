import { NavLink } from '@/util/NavLink';
import React from 'react'

const Navbar = () => {
    return (
        <nav className={`w-full sm:max-w-[150px] p-2 border-b sm:border-b-0 sm:border-r`}>
            <ul className="flex items-center sm:flex-col overflow-x-scroll hide-scrollbar">
                <li className="p-2 flex-shrink-0 w-fit sm:w-full">
                    <NavLink className="p-2 rounded-md w-fit sm:w-full text-left sm:inline-block" activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" href="/dashboard/following">Following</NavLink>
                </li>
                <li className="p-2 flex-shrink-0 w-fit sm:w-full">
                    <NavLink className="p-2 rounded-md w-fit sm:w-full text-left sm:inline-block" activeClassName="bg-[--app-selected-background-color] text-[--app-selected-text-color]" href="/dashboard/stats">Stats</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;