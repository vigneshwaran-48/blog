"use client";

import Image from 'next/image';
import React from 'react'
import bannerStyles from "./banner.module.css";
import { useAppDispatch } from '@/lib/hooks';
import { followProfile } from '@/app/actions/follow';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../../components/popup/PopUp';

interface Props {
    profileId: string,
    image: string,
    name: string,
    description: string,
    isFollowing: boolean
}

const ProfileBanner = ({ profileId, image, name, description, isFollowing }: Props) => {

    const dispatch = useAppDispatch();

    const onFollow = async () => {
        const response = await followProfile(profileId as string);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
    }

    const unFollow = async() => {

    }

    return (
        <div className={`${bannerStyles.banner} full-width y-axis-flex`}>
            <Image 
                src={image || "/person.jpg"} 
                alt="User Profile" 
                width={120} 
                height={120} 
            />
            <button onClick={e => isFollowing ? unFollow() : onFollow()} className={`button`}>
                { isFollowing ? "UnFollow" : "Follow" }
            </button>
            <h1>{ name }</h1>
            <p>{ description }</p>
        </div>
    )
}

export default ProfileBanner;