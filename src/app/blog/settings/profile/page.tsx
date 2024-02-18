import React from 'react'
import ProfileForm from './ProfileForm';
import styles from "./page.module.css";
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Profile",
        description: `Profile of the user`
    }
}

const ProfilePage = () => {
    return (
        <div className={`${styles.page} full-body`}>
            <ProfileForm />
        </div>
    )
}

export default ProfilePage;