import React from 'react'
import ProfileForm from './ProfileForm';
import styles from "./page.module.css";

const ProfilePage = () => {
    return (
        <div className={`${styles.page} full-body`}>
            <ProfileForm />
        </div>
    )
}

export default ProfilePage;