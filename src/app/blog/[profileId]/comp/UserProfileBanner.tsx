"use client";

import { UserMeta } from '@/util/AppTypes';
import React from 'react';
import bannerStyles from "./banner.module.css";
import Image from 'next/image';
import { followProfile } from '@/app/actions/follow';
import { useAppDispatch } from '@/lib/hooks';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../../components/popup/PopUp';

interface Props {
    user: UserMeta
}

const UserProfileBanner = ({ user }: Props) => {

    const dispatch = useAppDispatch();

    const onFollow = async () => {
        const response = await followProfile(user.profileId as string);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
    }

    return (
        <div className={`${bannerStyles.banner} full-width y-axis-flex`}>
            <Image 
                src={user.image || "/person.jpg"} 
                alt="User Profile" 
                width={120} 
                height={120} 
            />
            <button onClick={e => onFollow()} className={`button`}>Follow</button>
            <h1>{ user.name }</h1>
            <p>{ user.description }</p>
        </div>
    )
}

export default UserProfileBanner;