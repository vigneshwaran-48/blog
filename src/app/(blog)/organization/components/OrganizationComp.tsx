"use client";

import React from 'react'
import styles from "./page.module.css";
import { Organization } from '@/util/AppTypes';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { deleteOrganization } from '@/app/actions/organization';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../../components/popup/PopUp';
import { useRouter } from 'next/navigation';

interface Props {
    organization?: Organization,
    href?: string,
    settingsHref: string
}

export const OrganizationComp = (props: Props) => {

    const userId = useAppSelector(state => state.userSlice.id);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { organization, href = "/organization", settingsHref = "/organization" } = props;

    const handleOrganizationDelete = async(id: string) => {
        const response = await deleteOrganization(id);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), message: response.error, type: PopupType.FAILED }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), message: response.message, type: PopupType.SUCCESS }));
    }

    const handleOrgSettingsClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`${settingsHref}/settings`);
    }

    return (
        <div
            className={`${styles.organizationComp} x-axis-flex`}
            onClick={e => router.push(href)}
        >
            <Image 
                src={organization?.image || "/person.jpg"}
                width={50}
                height={50}
                alt="organization"
            />
            <div className={`${styles.organizationCompNameDesc}`}>
                <h3>{ organization?.name }</h3>
                <p>{ organization?.description }</p>
            </div>
            {
                userId === organization?.owner?.id && (
                    <span onClick={e => {
                        e.stopPropagation();
                        handleOrganizationDelete(organization.id as string);
                    }}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                )
            }
            <div onClick={handleOrgSettingsClick}>
                <FontAwesomeIcon icon={faGear} />
            </div>
        </div>
    )
}
