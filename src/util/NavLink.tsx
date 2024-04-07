"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { PRIVATE_ROUTES } from './AppFields';
import { setLoginPopup } from '@/lib/features/user/userSlice';

interface Props {
    children?: React.ReactNode,
    href: string,
    activeClassName?: string,
    className?: string | null,
    useStartsWith?: boolean,
}

export const NavLink = ({ children, href, activeClassName, className, useStartsWith = true }: Props) => {

    const isLoggedIn = useAppSelector(state => state.userSlice.isLoggedIn);
    const dispatch = useAppDispatch();

    const pathName = usePathname();

    const hanldeLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!isLoggedIn && PRIVATE_ROUTES.includes(href)) {
            e.preventDefault();
            dispatch(setLoginPopup(true));
        }
    }

    return (
        <Link href={href} className={`${className} ${useStartsWith
            ? pathName.startsWith(href)
                ? activeClassName : ""
            : pathName === href
                ? activeClassName : ""}`}
            onClick={e => hanldeLinkClick(href, e)}
            id={href}
        >
            {children}
        </Link>
    )
}
