"use client";

import { Organization } from '@/util/AppTypes';
import React, { useState } from 'react';
import styles from "./page.module.css";
import Input from "@/app/blog/components/form/Input";
import TextArea from '@/app/blog/components/form/TextArea';
import RadioGroup from '@/app/blog/components/form/RadioGroup';
import { Props } from '@/app/blog/components/form/Props';

interface FormProps {
    organization: Organization
}

const GeneralEditForm = ({ organization }: FormProps) => {

    const [ formData, setFormData ] = useState<Organization>({
        name: organization.name,
        description: organization.description,
        joinType: organization.joinType,
        visibility: organization.visibility
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

    const content = (
        <div 
            className={`${styles.generalEditForm} y-axis-flex`}
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
    )

    return (
        <form className={`full-body`}>
            { content }
        </form>
    )
}

export default GeneralEditForm;