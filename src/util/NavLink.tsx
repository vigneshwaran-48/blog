"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
    children?: React.ReactNode,
    href: string,
    activeClassName?: string,
    className?: string | null,
    useStartsWith?: boolean
}

export const NavLink = ( { children, href, activeClassName, className, useStartsWith = true }: Props ) => {

    const pathName = usePathname();

    return (
        <Link href={href} className={`${className} ${useStartsWith 
            ? pathName.startsWith(href) 
                ? activeClassName : ""
            : pathName === href 
                ? activeClassName : ""}`}
        >
            { children }
        </Link>
    )
}
