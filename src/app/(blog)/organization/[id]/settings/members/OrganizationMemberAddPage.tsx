import { UserMeta } from '@/util/AppTypes';
import React, { useEffect, useState } from 'react';
import styles from "./useradd.module.css";
import { SearchBar } from '@/app/(blog)/components/blog/SearchBar';
import User from '@/app/(blog)/components/blog/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
    members: UserMeta[],
    onAdd: (usersToAdd: UserMeta[]) => void,
    onClose: () => void
}

const OrganizationMemberAddPage = ({ members, onAdd, onClose }: Props) => {

    const [ usersToDisplay, setUsersToDisplay ] = useState<UserMeta[]>([]); 

    const [ selectedUsers, setSelectedUsers ] = useState<UserMeta[]>([]);

    useEffect(() => {
        console.log(members)
        setUsersToDisplay(members)
    }, []);

    const handleUsersSearch = (query: string) => {
        setUsersToDisplay(members.filter(user => user.name?.toLowerCase().includes(query.toLowerCase())));
    }

    const handleUserAdd = (id: string) => {
        setSelectedUsers(prevSelectedUsers => [ ...prevSelectedUsers, members.find(user => user.id === id) as UserMeta]);
        setUsersToDisplay(prevUsersToDisplay => prevUsersToDisplay.filter(user => user.id !== id));
    }

    const onRemoveSelectedUser = (id: string) => {
        setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(user => user.id !== id));
        setUsersToDisplay(prevUsersToDisplay => [ ...prevUsersToDisplay, members.find(user => user.id === id) as UserMeta]);
    }

    const userElems = usersToDisplay && usersToDisplay.length > 0 ? usersToDisplay.map((user, key) => {
        return <User 
                    key={key} 
                    data={user} 
                    add={true} 
                    onAction={handleUserAdd}
                    input={true}
                />
    })
    : <h2>No users found</h2>;

    const selectedUsersElem = selectedUsers && selectedUsers.length > 0 ? selectedUsers.map((user, key) => {
        return (
            <div key={key} className={`${styles.selectedUserContainer}`}>
                <img 
                    src={user?.image || "/person.jpg"}
                    alt="Selected user" />
                <span className={`x-axis-flex pointer`} onClick={e => onRemoveSelectedUser(user.id)}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>
        )
    })
    : null;

    return (
        <div className={`${styles.background} full-body x-axis-flex`} onClick={e => onClose()}>
            <div className={`${styles.userAddingWindow} y-axis-flex`} onClick={e => e.stopPropagation()}>
                <span className={`${styles.closeButton} pointer`} onClick={e => onClose()}>
                    <FontAwesomeIcon icon={faXmark} />
                </span>
                <SearchBar onSearch={handleUsersSearch} />
                <div className={`${styles.userListContainer} ${selectedUsersElem ? "h-[calc(100%-95px)]" : "h-[calc(100%-50px)]"} overflow-y-scroll hide-scrollbar full-width y-axis-flex`}>
                    { userElems }
                </div>
                {
                    selectedUsersElem &&  
                    <div className={`${styles.addedUsersPreview} items-center h-full x-axis-flex`}>
                        <div className={`${styles.addedUsersContainer} x-axis-flex`}>
                            { selectedUsersElem }
                        </div>
                        {
                            selectedUsers.length > 0 
                                ? <button onClick={e => onAdd(selectedUsers)} className={`button`}>Add</button> 
                                : ""
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default OrganizationMemberAddPage;