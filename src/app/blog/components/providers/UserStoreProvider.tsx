"use client";

import { getProfile } from '@/app/actions/user';
import { setUser } from '@/lib/features/user/userSlice';
import { useAppDispatch } from '@/lib/hooks';
import React, { useEffect } from 'react';

interface Props {
    children: React.ReactNode
}

const UserStoreProvider = ({ children }: Props) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log("User store provider fetch")
        setUserInStore();
    }, []);

    const setUserInStore = async () => {
        
        console.log("Fecthing current user details");
        const user = await getProfile();
        console.log(user);
        dispatch(setUser(user));
    }

    return (
        <>
            { children }
        </>
    )
}

export default UserStoreProvider;