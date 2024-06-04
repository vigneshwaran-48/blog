"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
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
    replacePlus?: boolean
}

export const NavLink = ({ children, href, activeClassName, className, useStartsWith = true, replacePlus = false }: Props) => {

    const isLoggedIn = useAppSelector(state => state.userSlice.isLoggedIn);
    const dispatch = useAppDispatch();

    const pathName = usePathname();
    const params = useSearchParams();
    let paramsString = params.toString();
    
    if (paramsString.endsWith("=")) {
        paramsString = paramsString.slice(0, paramsString.length - 1);
    }

    const hanldeLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!isLoggedIn && PRIVATE_ROUTES.includes(href)) {
            e.preventDefault();
            dispatch(setLoginPopup(true));
        }
    }

    let pathnameStr = `${pathName}${paramsString.length > 0 ? "?" + paramsString : ""}`

    if (replacePlus) {
        pathnameStr = pathnameStr.replaceAll("+", " ");
    }

    return (
        <Link href={href} className={`${className} ${useStartsWith
            ? pathnameStr.startsWith(href)
                ? activeClassName : ""
            : pathnameStr === href || decodeURI(pathnameStr) === href
                ? activeClassName : ""}`}
            onClick={e => hanldeLinkClick(href, e)}
            id={href}
        >
            {children}
        </Link>
    )
}
