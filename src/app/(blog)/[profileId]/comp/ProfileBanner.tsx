"use client";

import Image from 'next/image';
import React from 'react'
import bannerStyles from "./banner.module.css";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { followProfile, unFollowProfile } from '@/app/actions/follow';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../../components/popup/PopUp';
import styles from "./banner.module.css";

interface Props {
    profileId: string,
    image: string,
    name: string,
    description: string,
    isFollowing: boolean
}

const ProfileBanner = ({ profileId, image, name, description, isFollowing }: Props) => {

    const dispatch = useAppDispatch();
    const currentUserProfileId = useAppSelector(state => state.userSlice.profileId);

    const onFollow = async () => {
        const response = await followProfile(profileId as string);
        handleResponse(response);
    }

    const unFollow = async () => {
        const response = await unFollowProfile(profileId as string);
        handleResponse(response);
    }

    const handleResponse = (response: any) => {
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
    }

    return (
        <div className={`${bannerStyles.banner} full-width y-axis-flex`}>
            <Image 
                src={image || "/person.jpg"} 
                alt="User Profile" 
                width={120} 
                height={120} 
            />
            {
                currentUserProfileId !== profileId && (
                    <button 
                        onClick={e => isFollowing ? unFollow() : onFollow()} 
                        className={`button ${styles.followButton} ${isFollowing ? styles.unFollow : ""}`}
                    >
                        { isFollowing ? "UnFollow" : "Follow" }
                    </button>
                )
            }
            <h1 className="text-2xl font-semibold">{ name }</h1>
            <p>{ description }</p>
        </div>
    )
}

export default ProfileBanner;