"use client";

import { SearchBar } from '@/app/blog/components/blog/SearchBar';
import { UserMeta } from '@/util/AppTypes';
import React, { useState } from 'react';
import styles from "./page.module.css";
import User from '@/app/blog/components/blog/User';
import { useAppSelector } from '@/lib/hooks';

interface Props {
    users: UserMeta[],
    addedUsers: UserMeta[],
    setAddedUsers: React.Dispatch<React.SetStateAction<UserMeta[]>>
    setUsers: React.Dispatch<React.SetStateAction<UserMeta[]>>
}

const UserAddingSection = (props: Props) => {

    const { users, addedUsers, setAddedUsers, setUsers } = props;

    const [ userSearchQuery, setUserSearchQuery ] = useState<string>("");

    const currentUserId = useAppSelector(state => state.userSlice.id);

    const onUserAdd = (id: string) => {
        const userToAdd = users.find(user => user.id === id);
        if(!userToAdd) {
            throw new Error(`The user to add ${id} is not in the users list ${users}`);
        }
        setAddedUsers(prevAddedUsers => [...prevAddedUsers, userToAdd]);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    }

    const onUserRemove = (id: string) => {
        const userToRemove = addedUsers.find(user => user.id === id);
        if(!userToRemove) {
            throw new Error(`The user to remove ${id} is not in the users list ${addedUsers}`);
        }
        setAddedUsers(prevAddedUsers => {
            return prevAddedUsers.filter(user => user.id !== id);
        })
        setUsers(prevUsers => [...prevUsers, userToRemove]);
    }

    const userElems = users && users.length > 0 
                            ? users
                                .filter(user => 
                                    (userSearchQuery.length < 1 || 
                                    user.name?.toLowerCase().includes(userSearchQuery.toLowerCase()))
                                    &&
                                    user.id !== currentUserId
                                )
                                .map(user => <User 
                                                    key={user.id} 
                                                    data={user} 
                                                    input={true} 
                                                    add={true} 
                                                    onAction={onUserAdd}
                                                    />
                                        )
                            : <p>No users found</p>

    const addedUsersElems = addedUsers.length > 0
                                ? addedUsers.map((user, key) => <User 
                                                                    key={key} 
                                                                    data={user} 
                                                                    input={true} 
                                                                    add={false} 
                                                                    onAction={onUserRemove}
                                                                    />
                                                )
                                : <NoUsersFound />

    return (
        <div className={`${styles.userAddingSection} x-axis-flex`}>
            <div className={`${styles.userAddingForm} y-axis-flex`}>
                <SearchBar onSearch={setUserSearchQuery} />
                <div className={`hide-scrollbar y-axis-flex`}>
                    { userElems }
                </div>
            </div>
            <div className={`${styles.addedUserPreview} hide-scrollbar y-axis-flex`}>
                <h2>Users ({ addedUsers.length })</h2>
                <div className={`hide-scrollbar y-axis-flex`}>
                    { addedUsersElems }
                </div>
            </div>
        </div>
    )
}

const NoUsersFound = () => {

    return (
        <div>
            <img className={styles.noUsersImage} src="/no-users.png" alt="No users" />
        </div>
    )
}

export default UserAddingSection;