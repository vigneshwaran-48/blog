"use client";

import { SearchBar } from '@/app/blog/components/blog/SearchBar';
import { UserMeta } from '@/util/AppTypes';
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import User from '@/app/blog/components/blog/User';

const UserAddingSection = () => {

    const [ users, setUsers ] = useState<UserMeta[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch("/api/user");

        if(!response.ok) {
            console.error("Error while fetching user details");
            return;
        }
        const data = await response.json();
        setUsers(data.users);
    }

    console.log(users);

    const userElems = users.length > 0 
                            ? users.map(user => <User key={user.id} data={user} />) 
                            : <p>No users found</p>

    return (
        <div className={`${styles.userAddingSection} x-axis-flex`}>
            <div className={`${styles.userAddingForm} y-axis-flex`}>
                <SearchBar />
                <div>
                    { userElems }
                </div>
            </div>
            <div className={`${styles.addedUserPreview} y-axis-flex`}>

            </div>
        </div>
    )
}

export default UserAddingSection;