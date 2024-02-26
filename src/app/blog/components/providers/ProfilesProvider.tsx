"use client";

import { getAllProfiles } from '@/app/actions/profile';
import { setProfile } from '@/lib/features/profile/profileSlice';
import { useAppDispatch } from '@/lib/hooks';
import { ProfileId } from '@/util/AppTypes';
import React, { useEffect } from 'react'

interface Props {
    children: React.ReactNode
}

const ProfilesProvider = ({ children }: Props) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        setProfilesInStore();
    }, []);

    const setProfilesInStore = async () => {
        const profiles: ProfileId[] = await getAllProfiles();
        console.log(profiles);
        dispatch(setProfile(profiles));
    }

    return (
        <>
            { children }
        </>
    )
}

export default ProfilesProvider;