"use client";

import React, { useEffect, useState } from 'react'
import ImageInput from '../../components/form/ImageInput';
import Input from '../../components/form/Input';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import styles from "./profile.module.css";
import { UserMeta } from '@/util/AppTypes';
import { updateUser } from '@/app/actions/user';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../../components/popup/PopUp';
import { setUser } from '@/lib/features/user/userSlice';
import TextArea from '../../components/form/TextArea';
import { getStaticResourceRoutes } from '@/util/ResourceServer';
import { uploadImage } from '@/app/actions/staticResource';

const ProfileForm = () => {
    
    const user = useAppSelector(state => state.userSlice);
    const dispatch = useAppDispatch();
    const [ userFormState, setUserFormState ] = useState<UserMeta>(user);

    useEffect(() => {
        setUserFormState(user);
    }, [user]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) {
            return;
        }
        const form = new FormData();
        form.append("resource", e.target.files[0]);
        const resourceResponse = await uploadImage(form);

        if(resourceResponse.status !== 200 && resourceResponse.status !== 201) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: resourceResponse.error }));
            return;
        }
        const imageUrl = getStaticResourceRoutes().getOne(resourceResponse.id);
        setUserFormState(prevUserFormState => ({ ...prevUserFormState, image: imageUrl}));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserFormState(prevUserFormState => ({ ...prevUserFormState, [name]: value }))
    }

    const saveProfile = async () => {
        const response = await updateUser(userFormState);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
        dispatch(setUser(response.user));
    }

    return (
        <div className={`${styles.profileForm} full-body y-axis-flex`}>
            <ImageInput 
                name="user-profile-image" 
                value={userFormState.image}
                onChange={e => handleImageChange(e as React.ChangeEvent<HTMLInputElement>)}
            />
            <Input 
                value={userFormState.name} 
                onChange={handleChange}
                name="name"
                displayName="Display Name"
            />
            <Input 
                value={userFormState.profileId} 
                onChange={handleChange}
                name="profileId"
                displayName="Profile Id"
            />
            <TextArea
                name="description"
                value={userFormState.description}
                onChange={handleChange}
                displayName="Description"
            />
            <button className={`button`} onClick={saveProfile}>Save Profile</button>
        </div>
    )
}

export default ProfileForm;