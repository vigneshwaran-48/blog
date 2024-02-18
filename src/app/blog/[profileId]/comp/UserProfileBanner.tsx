import { UserMeta } from '@/util/AppTypes';
import React from 'react';
import bannerStyles from "./banner.module.css";
import Image from 'next/image';

interface Props {
    user: UserMeta
}

const UserProfileBanner = ({ user }: Props) => {
    return (
        <div className={`${bannerStyles.banner} full-width y-axis-flex`}>
            <Image 
                src={user.image || "/person.jpg"} 
                alt="User Profile" 
                width={120} 
                height={120} 
            />
            <button className={`button`}>Follow</button>
            <h1>{ user.name }</h1>
            <p>{ user.description }</p>
        </div>
    )
}

export default UserProfileBanner;