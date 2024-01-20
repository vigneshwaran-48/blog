"use client";

import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import Input from '@/app/blog/components/form/Input';
import TextArea from '@/app/blog/components/form/TextArea';
import { Organization, UserMeta } from '@/util/AppTypes';
import RadioGroup from '@/app/blog/components/form/RadioGroup';
import { Props } from '@/app/blog/components/form/Props';
import UserAddingSection from './UserAddingSection';
import { addUsersToOrganization, createOrganization } from '@/app/actions/organization';
import { useFormStatus } from 'react-dom';
import { getAllUsers } from '@/app/actions/user';
import { useRouter } from 'next/navigation';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { PopupType } from '@/app/blog/components/popup/PopUp';
import { getUniqueId } from '@/util/getUniqueId';

const OrganizationCreationForm = () => {

    const formStatus = useFormStatus();
    
    const [ formData, setFormData ] = useState<Organization>({
        name: "",
        description: "",
        joinType: "ANYONE",
        visibility: "PUBLIC"
    });

    const [ showUserAddingSection, setShowUserAddingSection ] = useState<boolean>(false);

    const [ users, setUsers ] = useState<UserMeta[]>([]);

    const [ addedUsers, setAddedUsers ] = useState<UserMeta[]>([]);

    const [ currentOrganization, setCurrentOrganization ] = useState<Organization>();

    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const users = await getAllUsers();
        setUsers(users);
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [ name ]: value
            }
        });
    }

    const handleFormAction = async (form: FormData) => {
        if(!showUserAddingSection) {
            const response = await createOrganization(formData);
            if(response.status != 200 || response.status !== 201) {
                addPopup({
                    id: getUniqueId(),
                    type: PopupType.FAILED,
                    message: response.error
                });
                return;
            }
            addPopup({
                id: getUniqueId(),
                type: PopupType.SUCCESS,
                message: response.message
            });
            const organization: Organization = response.data;
            setCurrentOrganization(organization);
            setShowUserAddingSection(true);
            return;
        }
        await addUsersToOrganization(currentOrganization?.id as number, addedUsers.map(user => user.id));
        router.push(`/blog/organization/list/${currentOrganization?.id}`);
    }

    const visibilityRadioButtons: Props[] = [
        {
            name: "visibility",
            displayName: "Public",
            value: "PUBLIC",
            checked: formData.visibility === "PUBLIC",
            onChange: handleFormChange
        },
        {
            name: "visibility",
            displayName: "Private",
            value: "PRIVATE",
            checked: formData.visibility === "PRIVATE",
            onChange: handleFormChange
        }
    ];

    const joinTypeRadioButtons: Props[] = [
        {
            name: "joinType",
            displayName: "Anyone",
            value: "ANYONE",
            checked: formData.joinType === "ANYONE",
            onChange: handleFormChange
        },
        {
            name: "joinType",
            displayName: "Members Invite",
            value: "MEMBERS_INVITE",
            checked: formData.joinType === "MEMBERS_INVITE",
            onChange: handleFormChange
        },
        {
            name: "joinType",
            displayName: "Invite",
            value: "INVITE",
            checked: formData.joinType === "INVITE",
            onChange: handleFormChange
        }
    ];

    const content = !showUserAddingSection ? (
        <div 
            className={`${styles.organizationCreationForm} y-axis-flex`}
        >
            <Input 
                name="name" 
                value={formData.name} 
                onChange={handleFormChange}
                displayName="Name" 
            />
                
            <TextArea 
                name="description"
                value={formData.description as string}
                onChange={handleFormChange}
                displayName="Description"
            />

            <RadioGroup 
                displayName="Visibility"
                radios={visibilityRadioButtons}
            />

            <RadioGroup 
                displayName="Join Type"
                radios={joinTypeRadioButtons}
            />

        </div>
    ) : <UserAddingSection 
            addedUsers={addedUsers} 
            users={users} 
            setAddedUsers={setAddedUsers}
            setUsers={setUsers}
        />

    return (
        <form 
            className={`${styles.organizationCreationContainer} full-body y-axis-flex`}
            action={handleFormAction}
        >
            { content }
            <nav className={`${styles.organizationCreationNavbar} full-width x-axis-flex`}>
                <button 
                    className={`button`}
                    type="submit"
                >{ formStatus.pending ? "Creating ..." : !showUserAddingSection ? "Create" : "Finish"}</button>
            </nav>
        </form>
    )
}

export default OrganizationCreationForm;