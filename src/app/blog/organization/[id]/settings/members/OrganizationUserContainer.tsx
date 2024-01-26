"use client";

import { OrganizationUser, UserRole } from '@/util/AppTypes';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./orguser.module.css";
import Image from 'next/image';
import { faCheck, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateUserRole } from '@/app/actions/organization';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '@/app/blog/components/popup/PopUp';
import { PopupDialogType, PopupModelContextProvider } from '@/app/blog/components/popup/PopupModelProvider';

interface Props {
    user: OrganizationUser,
    organizationId: number,
    onRemove: (id: string) => void
}

const OrganizationUserContainer = ({ user, organizationId, onRemove }: Props) => {

    const popupModel = useContext(PopupModelContextProvider);

    const { name, image } = user.details;

    const currentUser = useAppSelector(state => state.userSlice);

    const dispatch = useAppDispatch();

    const [ role, setRole ] = useState<UserRole>(user.role);

    const onUserRoleChange = async (role: UserRole) => {

        if(role == "ADMIN") {
            popupModel.setPopupModelState({
                message: "Performing this action will degrade your role",
                title: "Role change",
                onClose: () => {},
                onProceed: () => changeRole(role),
                type: PopupDialogType.WARNING,
                open: true
            });
        }
        else if(currentUser.id === user.details.id && user.role === "ADMIN") {
            popupModel.setPopupModelState({
                message: "This operation will degrade your current role in this organization",
                title: "Role change",
                onClose: () => {},
                onProceed: () => changeRole(role),
                type: PopupDialogType.WARNING,
                open: true
            });
        }
        else {
            changeRole(role);
        }
    }

    const changeRole = async (role: UserRole) => {
        const response = await updateUserRole(organizationId, user.details.id, role);
        dispatch(addPopup({
            id: getUniqueId(),
            message: response.status !== 200 ? response.error : response.message,
            type: response.status !== 200 ? PopupType.FAILED : PopupType.SUCCESS
        }));

        if(response.status === 200) {
            setRole(role);
        }
    }

    return (
        <div className={`${styles.userContainer} x-axis-flex full-width`}>
            <Image 
                src={image as string}
                width={40}
                height={40}
                alt="Organization Member"
            />
            <p>{ name }</p>
            <div className={`${styles.operationsContainer} x-axis-flex`}>
                <UserRole 
                    role={role}
                    onRoleChange={onUserRoleChange}
                />
                <span 
                    className={`${styles.removeUserButton} pointer`}
                    onClick={e => onRemove(user.details.id)}
                >
                    <FontAwesomeIcon icon={faCircleMinus} />
                </span>
            </div>
        </div>
    )
}

interface UserRoleProps {
    role: UserRole,
    onRoleChange: (role: UserRole) => void
}

const roleImages = {
    ADMIN: "/admin.png",
    MODERATOR: "/moderator.png",
    MEMBER: "/member.png"
}

const currentRoleIcon = (
    <span>
        <FontAwesomeIcon icon={faCheck} />
    </span>
);

const emptyIcon = (
    <span></span>
)

const UserRole = ({ role, onRoleChange }: UserRoleProps) => {

    const elementRef = useRef<HTMLDivElement>(null);

    const [ showRoleOptions, setShowRoleOptions ] = useState<boolean>(false);

    const handleOutsideClick = (e: MouseEvent) => {
        if(elementRef.current && !elementRef.current.contains(e.target as Node)) {
            setShowRoleOptions(false);
        }
    }

    useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);

        return (() => {
            document.body.removeEventListener("click", handleOutsideClick);
        })
    }, []);

    const handleImageClick = () => {
        setShowRoleOptions(prev => !prev);
    }

    return (
        <div 
            className={`${styles.userRole} x-axis-flex pointer`}
            ref={elementRef}
        >
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
                <li 
                    className={`x-axis-flex`}
                    onClick={() => onRoleChange("ADMIN")}
                >{role === "ADMIN" ? currentRoleIcon : emptyIcon} Admin</li>
                <li 
                    className={`x-axis-flex`}
                    onClick={() => onRoleChange("MODERATOR")}
                >{role === "MODERATOR" ? currentRoleIcon : emptyIcon} Moderator</li>
                <li 
                    className={`x-axis-flex`}
                    onClick={() => onRoleChange("MEMBER")}
                >{role === "MEMBER" ? currentRoleIcon : emptyIcon} Member</li>
            </ul>
        </div>
    )
}
export default OrganizationUserContainer;