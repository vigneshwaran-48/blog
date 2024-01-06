"use client";

import { UserMeta } from '@/util/AppTypes';
import Image from 'next/image';
import React from 'react';
import styles from "./page.module.css";

interface Props {
    data: UserMeta 
}

const User = ({ data }: Props) => {

    const { name, image } = data;

    return (
        <div className={`${styles.userListContainer} full-width x-axis-flex`}>
            <Image 
                src={image as string}
                alt="user"
                width={40}
                height={40}
            />
            <p>{ name }</p>
        </div>
    )
}

export default User;