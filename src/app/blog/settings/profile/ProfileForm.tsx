"use client";

import React from 'react'
import ImageInput from '../../components/form/ImageInput';
import { useAppSelector } from '@/lib/hooks';

const ProfileForm = () => {
    
    const user = useAppSelector(state => state.userSlice);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    }
    return (
        <div>
            <ImageInput 
                name="user-profile-image" 
                value={user.image}
                onChange={handleImageChange}
            />
        </div>
    )
}

export default ProfileForm;