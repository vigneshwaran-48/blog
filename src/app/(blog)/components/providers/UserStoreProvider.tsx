"use client";

import { getAllTags } from '@/app/actions/tag';
import { getUserProfile } from '@/app/actions/user';
import { setTheme } from '@/lib/features/settings/preferencesSlice';
import { setTags } from '@/lib/features/tags/tagSlice';
import { setUser } from '@/lib/features/user/userSlice';
import { useAppDispatch } from '@/lib/hooks';
import { Tag, UserMeta, Notification } from '@/util/AppTypes';
import React, { useEffect, useState } from 'react';
import DolphinLoader from '../loaders/DolphinLoader';
import { getNotificationsOfUser } from '@/app/actions/notification';
import { setNotifications } from '@/lib/features/notification/notificationSlice';

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
            const [tags, notifications]: [Tag[], Notification[]] = await Promise.all([getAllTags(), getNotificationsOfUser()]);
            console.log(notifications)
            dispatch(setTags(tags));
            dispatch(setNotifications(notifications));
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