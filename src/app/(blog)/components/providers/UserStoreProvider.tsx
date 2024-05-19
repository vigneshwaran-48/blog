"use client";

import { getAllTags, getFollowingTags } from '@/app/actions/tag';
import { getUserProfile } from '@/app/actions/user';
import { setTheme } from '@/lib/features/settings/preferencesSlice';
import { setTags } from '@/lib/features/tags/tagSlice';
import { setUser } from '@/lib/features/user/userSlice';
import { useAppDispatch } from '@/lib/hooks';
import { UserMeta } from '@/util/AppTypes';
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
            { children }
        </>
    )
}

export default UserStoreProvider;