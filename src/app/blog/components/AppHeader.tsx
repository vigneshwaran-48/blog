"use client";

import React from 'react';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AppFields } from '@/util/AppFields';
import { Blog, UserMeta } from '@/util/AppTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { addBlog, updateBlog } from '@/app/actions/blog';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from './popup/PopUp';
import { clearBlog } from '@/lib/features/compose/composeSlice';

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
                    !pathname.startsWith("/blog/compose")
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

// This component will render for every single state field change but not a big problem its a small button.
// If a big problem came then need to think about refactoring this.
const PublishBlog = ({ user }: PublishProps) => {

    const blogContent = useAppSelector(state => state.composeSlice.content);

    const { title, image, isEdit, id, isSaving } = useAppSelector(state => state.composeSlice);

    const dispatch = useAppDispatch();

    const router = useRouter();

    const onPublishBlog = async (isEditMode: boolean) => {

        const blog: Blog = {
            content: blogContent,
            title,
            image,
            owner: user,
            id
        }
        const response = isEditMode ? await updateBlog(blog) : await addBlog(blog);

        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
        dispatch(clearBlog());

        router.push("/blog/stories");
    }

    return (
        isSaving ? (
            <p>Saving ....</p>
        ) :
        isEdit ? (
            <button 
                className={`${styles.publishButton} button`}
                onClick={e => onPublishBlog(isEdit)}
            >Save</button>
        ) : (
            <button 
                className={`${styles.publishButton} button`}
                onClick={e=> onPublishBlog(isEdit)}
            >Publish</button>
        )
    )
}
