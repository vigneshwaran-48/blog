import React from 'react';
import styles from "./publishBlog.module.css";
import Dropdown, { Item } from './form/Dropdown';

interface Props {
    isOpen: boolean
}

const PublishModal = ({ isOpen }: Props) => {

    const items: Item[] = [
        {
            id: "test-123",
            displayName: "Test 1"
        },
        {
            id: "test-124",
            displayName: "Test 2"
        }
    ]
    return (
        <div className={`${styles.publishModal} ${isOpen ? styles.showModal : ""} full-body x-axis-flex`}>
            <div className={`${styles.background} full-body`}></div>
            <div className={`${styles.modal} y-axis-flex`}>
                <div className={`${styles.modalRow} x-axis-flex full-width`}>
                    <p>Publish At</p>
                    <Dropdown displayName="Select" items={items} />
                </div>
                <div className={`${styles.modalRow} x-axis-flex full-width`}>
                    <p>Tags</p>
                    <p>Javascript</p>
                </div>
            </div>
        </div>
    )
}

export default PublishModal;