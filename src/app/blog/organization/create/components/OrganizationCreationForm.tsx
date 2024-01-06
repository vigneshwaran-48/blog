"use client";

import React, { useState } from 'react';
import styles from "./page.module.css";
import Input from '@/app/blog/components/form/Input';
import TextArea from '@/app/blog/components/form/TextArea';
import { Organization } from '@/util/AppTypes';
import RadioGroup from '@/app/blog/components/form/RadioGroup';
import { Props } from '@/app/blog/components/form/Props';

const OrganizationCreationForm = () => {

    const [ formData, setFormData ] = useState<Organization>({
        name: "",
        description: "",
        joinType: "ANYONE",
        visibility: "PUBLIC"
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [ name ]: value
            }
        });
    }

    const handleOrganizationCreateButton = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("Creating organization ");
        console.log(formData);

        const response = await fetch("/api/organization", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(formData)
                                });
        if(!response.ok) {
            console.error("Error while creating organization");
        }
        const respData = await response.json();
        console.log(respData);
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

    return (
        <div className={`${styles.organizationCreationContainer} full-body y-axis-flex`}>
            <div className={`${styles.organizationCreationForm} y-axis-flex`}>
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
            <nav className={`${styles.organizationCreationNavbar} full-width x-axis-flex`}>
                <button 
                    className={`button`}
                    type="button"
                    onClick={handleOrganizationCreateButton}
                >Create</button>
            </nav>
        </div>
    )
}

export default OrganizationCreationForm;