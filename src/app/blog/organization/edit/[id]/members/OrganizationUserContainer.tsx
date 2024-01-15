import { OrganizationUser, UserMeta } from '@/util/AppTypes';
import React, { useState } from 'react';
import styles from "./orguser.module.css";
import Image from 'next/image';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    user: OrganizationUser
}

const OrganizationUserContainer = ({ user }: Props) => {

    const { name, image } = user.details;

    return (
        <div className={`${styles.userContainer} x-axis-flex full-width`}>
            <Image 
                src={user.details.image as string}
                width={40}
                height={40}
                alt="Organization Member"
            />
            <p>{ user.details.name }</p>
            <div className={`${styles.operationsContainer} x-axis-flex`}>
                <UserRole role={user.role} />
                <span className={`${styles.removeUserButton} pointer`}>
                    <FontAwesomeIcon icon={faCircleMinus} />
                </span>
            </div>
        </div>
    )
}

interface UserRoleProps {
    role: "ADMIN" | "MODERATOR" | "MEMBER"
}

const roleImages = {
    ADMIN: "/admin.png",
    MODERATOR: "/moderator.png",
    MEMBER: "/member.png"
}

const UserRole = ({ role }: UserRoleProps) => {

    const [ showRoleOptions, setShowRoleOptions ] = useState<boolean>(false);

    const handleImageClick = () => {
        setShowRoleOptions(prev => !prev);
    }

    return (
        <div className={`${styles.userRole} x-axis-flex pointer`}>
            <Image 
                src={roleImages[role]}
                width={20}
                height={20}
                alt="User role"
                onClick={e => handleImageClick()}
            />
            <ul style={{
                transform: showRoleOptions ? "scaleY(1)": ""
            }}>
                <li>Admin</li>
                <li>Moderator</li>
                <li>Member</li>
            </ul>
        </div>
    )
}
export default OrganizationUserContainer;