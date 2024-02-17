"use client";

import React, { useEffect, useState } from 'react'
import ImageInput from '../../components/form/ImageInput';
import Input from '../../components/form/Input';
import { useAppSelector } from '@/lib/hooks';
import styles from "./profile.module.css";
import { UserMeta } from '@/util/AppTypes';

const ProfileForm = () => {
    
    const user = useAppSelector(state => state.userSlice);
    const [ userFormState, setUserFormState ] = useState<UserMeta>(user);

    useEffect(() => {
        setUserFormState(user);
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserFormState(prevUserFormState => ({ ...prevUserFormState, [name]: value }))
    }

    return (
        <div className={`${styles.profileForm} full-body y-axis-flex`}>
            <ImageInput 
                name="user-profile-image" 
                value={userFormState.image}
                onChange={handleImageChange}
            />
            <Input 
                value={userFormState.name} 
                onChange={handleChange}
                name="name"
                displayName="Display Name"
            />
            <Input 
                value={userFormState.description} 
                onChange={handleChange}
                name="description"
                displayName="Description"
            />
        </div>
    )
}

export default ProfileForm;