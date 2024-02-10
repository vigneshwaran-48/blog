"use client";

import React from 'react';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AppFields } from '@/util/AppFields';
import { Blog, UserMeta } from '@/util/AppTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { addBlog } from '@/app/actions/blog';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from './popup/PopUp';
import { uploadImage } from '@/app/actions/staticResource';
import { getStaticResourceRoutes } from '@/util/ResourceServer';
import { getFileFromImageUrl } from '@/util/getFileFromImageUrl';

interface PublishProps {
    user: UserMeta
}

export const AppHeader = () => {

    const user: UserMeta = useAppSelector(state => state.userSlice);

    const pathname = usePathname();

    const handleNavbarToggle = () => {
        const rootElement = document.querySelector(":root");
        if(rootElement) {
            const currentValue = getComputedStyle(rootElement).getPropertyValue(AppFields.APP_NAVBAR_STATUS);
            document.documentElement.style.setProperty(AppFields.APP_NAVBAR_STATUS, currentValue === "-100%" ? "0%" : "-100%");
        }
    }

    return (
        <header className={`${styles.appHeader} full-width x-axis-flex`}>
            <div className={`${styles.appOrHamburgerMenu}`}>
                <h1>Blog App</h1>
                <FontAwesomeIcon onClick={handleNavbarToggle} icon={faBars} />
            </div>
            <div className={`${styles.rightBar} x-axis-flex`}>
                {
                    pathname !== "/blog/compose" 
                    ? (
                        <Link 
                            href="/blog/compose" 
                            className={`${styles.composeIcon} x-axis-flex`}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <p>Create</p>
                        </Link>
                    )
                    : (
                        <PublishBlog user={user} />
                    )
                }
                
                
                <img src={user?.image || "/person.jpg"} alt="user" />
            </div>
        </header>
    )
}

const PublishBlog = ({ user }: PublishProps) => {

    const blogContent = useAppSelector(state => state.composeSlice.content);

    const title = useAppSelector(state => state.composeSlice.title);

    const image = useAppSelector(state => state.composeSlice.image);

    const dispatch = useAppDispatch();

    const onPublishBlog = async () => {

        const blog: Blog = {
            content: blogContent,
            title,
            image,
            owner: user
        }

        const imageFile = await getFileFromImageUrl(image);
        
        const form = new FormData();
        form.append("resource", imageFile);

        const resourceResponse = await uploadImage(form);

        console.log(resourceResponse);

        if(resourceResponse.status !== 200 && resourceResponse.status !== 201) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: resourceResponse.error }));
            return;
        }
        
        blog.image = getStaticResourceRoutes().getOne(resourceResponse.id);
        const response = await addBlog(blog);

        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
    }

    return (
        <button 
            className={`${styles.publishButton} button`}
            onClick={onPublishBlog}
        >Publish</button>
    )
}
