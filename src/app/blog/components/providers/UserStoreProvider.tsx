"use client";

import { getUserProfile } from '@/app/actions/user';
import { setUser } from '@/lib/features/user/userSlice';
import { useAppDispatch } from '@/lib/hooks';
import React, { useEffect } from 'react';

interface Props {
    children: React.ReactNode
}

const UserStoreProvider = ({ children }: Props) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        setUserInStore();
    }, []);

    const setUserInStore = async () => {
        const user = await getUserProfile();
        dispatch(setUser(user));
    }

    return (
        <>
            { children }
        </>
    )
}

export default UserStoreProvider;