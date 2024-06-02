"use client";

import { getAllTags, getFollowingTags } from '@/app/actions/tag';
import { getUserProfile } from '@/app/actions/user';
import { setTheme } from '@/lib/features/settings/preferencesSlice';
import { setTags } from '@/lib/features/tags/tagSlice';
import { setUser } from '@/lib/features/user/userSlice';
import { useAppDispatch } from '@/lib/hooks';
import { UserMeta } from '@/util/AppTypes';
import React, { useEffect, useState } from 'react';
import DolphinLoader from '../loaders/DolphinLoader';

interface Props {
    children: React.ReactNode
}

const UserStoreProvider = ({ children }: Props) => {

    const dispatch = useAppDispatch();

    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        setUserInStore();
        setIsLoading(false);
    }, []);

    const setUserInStore = async () => {
        const user: UserMeta = await getUserProfile();
        if (user.isLoggedIn) {
            const tags = await getAllTags();
            dispatch(setTags(tags));
        }
        dispatch(setUser(user));
        dispatch(setTheme(user.preferences?.theme || "LIGHT"));
    }

    return (
        <>
            { isLoading ? <DolphinLoader /> : children }
        </>
    )
}

export default UserStoreProvider;