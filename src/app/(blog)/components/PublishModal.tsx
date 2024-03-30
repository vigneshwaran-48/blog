import React, { useEffect, useState } from 'react';
import styles from "./publishBlog.module.css";
import Dropdown from './form/Dropdown';
import { ProfileId } from '@/util/AppTypes';
import { getAllProfiles } from '@/app/actions/profile';
import { publishBlog } from '@/app/actions/blog';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getUniqueId } from '@/util/getUniqueId';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { PopupType } from './popup/PopUp';
import { useRouter } from 'next/navigation';

interface Props {
    isOpen: boolean,
    onClose: () => void
}

const PublishModal = ({ isOpen, onClose }: Props) => {

    const blogId = useAppSelector(state => state.composeSlice.id);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [ profiles, setProfiles ] = useState<ProfileId[]>([]);
    const [ publishAtProfile, setPublishAtProfile ] = useState<ProfileId>();

    useEffect(() => {
        fetchProfiles();
    }, [isOpen]);

    const fetchProfiles = async () => {
        const profiles: ProfileId[] = await getAllProfiles();
        setProfiles(profiles);
        setPublishAtProfile(profiles[0]);
    }

    const onDropDownSelect = (id: string) => {
        setPublishAtProfile(profiles.find(profile => profile.id === Number.parseInt(id)));
    }

    const onPublish = async () => {
        if(!blogId) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: "No blog to publish"}));
            return;
        }
        const response = await publishBlog(blogId, publishAtProfile?.profileId as string);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
        router.push(`/${publishAtProfile?.profileId}/${blogId}`);
    }

    const items = profiles.map(profile => ({ id: profile.id + "", displayName: profile.profileId }));

    return (
        <div className={`${styles.publishModal} ${isOpen ? styles.showModal : ""} full-body x-axis-flex`}>
            <div 
                className={`${styles.background} full-body`}
                onClick={e => onClose()}
            ></div>
            <div className={`${styles.modal} y-axis-flex`}>
                <div className={`${styles.modalRow} x-axis-flex full-width`}>
                    <p>Publish At</p>
                    <Dropdown items={items} onSelect={onDropDownSelect} />
                </div>
                <div className={`${styles.modalRow} x-axis-flex full-width`}>
                    <p>Tags</p>
                    <p>Javascript</p>
                </div>
                <button className={`button`} onClick={onPublish}>Publish</button>
            </div>
        </div>
    )
}

export default PublishModal;