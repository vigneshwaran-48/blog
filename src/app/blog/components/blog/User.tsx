"use client";

import { UserMeta } from '@/util/AppTypes';
import Image from 'next/image';
import React from 'react';
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
    data: UserMeta,
    input?: boolean,
    add?: boolean,
    onAction?: (id: string) => void
}

const User = (props: Props) => {

    const { data, input = false, add = false, onAction = () => {} } = props;

    const { name, image, id } = data;

    return (
        <div className={`${styles.userListContainer} full-width x-axis-flex`}>
            <Image 
                src={image as string}
                alt="user"
                width={40}
                height={40}
            />
            <p>{ name }</p>
            {input ? 
                add 
                    ? <FontAwesomeIcon icon={faPlus} onClick={e => onAction(id)} /> 
                    : <FontAwesomeIcon 
                        icon={faCircleMinus} 
                        onClick={e => onAction(id)}
                        style={{
                            color: "red",
                            backgroundColor: "transparent",
                            fontSize: "20px"
                        }}
                    /> 
                : ""
            }
            { input ? <input type="hidden" name="userId" value={id} /> : ""}
        </div>
    )
}

export default User;