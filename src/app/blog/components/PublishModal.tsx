import React from 'react';
import styles from "./publishBlog.module.css";
import Dropdown from './form/Dropdown';
import { useAppSelector } from '@/lib/hooks';

interface Props {
    isOpen: boolean
}

const PublishModal = ({ isOpen }: Props) => {

    const profiles = useAppSelector(state => state.profileSlice.value);

    console.log(profiles);

    const items = profiles.map(profile => ({ id: profile.id + "", displayName: profile.profileId }));

    const onDropDownSelect = (id: string) => {
        console.log(id);
    }
    return (
        <div className={`${styles.publishModal} ${isOpen ? styles.showModal : ""} full-body x-axis-flex`}>
            <div className={`${styles.background} full-body`}></div>
            <div className={`${styles.modal} y-axis-flex`}>
                <div className={`${styles.modalRow} x-axis-flex full-width`}>
                    <p>Publish At</p>
                    <Dropdown items={items} onSelect={onDropDownSelect} />
                </div>
                <div className={`${styles.modalRow} x-axis-flex full-width`}>
                    <p>Tags</p>
                    <p>Javascript</p>
                </div>
                <button className={`button`}>Publish</button>
            </div>
        </div>
    )
}

export default PublishModal;