"use client";

import { setLoginPopup } from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { PRIVATE_ROUTES } from '@/util/AppFields';
import { usePathname } from 'next/navigation';
import React from 'react'

interface Props {
    children: React.ReactNode
}

const LoginStatusChecker = ({ children }: Props) => {

    const pathname = usePathname();
    const isLoggedIn = useAppSelector(state => state.userSlice.isLoggedIn);
    const dispatch = useAppDispatch();

    if (!isLoggedIn && PRIVATE_ROUTES.includes(pathname)) {
        dispatch(setLoginPopup(true));
    } else {
        console.log("User can view this page!");
        dispatch(setLoginPopup(false));
    }

    return (
        <>
            { children }
        </>
    )
}

export default LoginStatusChecker;