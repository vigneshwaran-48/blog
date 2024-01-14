"use client";

import { Organization } from '@/util/AppTypes';
import React, { useState } from 'react';
import styles from "./page.module.css";
import Input from "@/app/blog/components/form/Input";
import TextArea from '@/app/blog/components/form/TextArea';
import RadioGroup from '@/app/blog/components/form/RadioGroup';
import { Props } from '@/app/blog/components/form/Props';
import ImageInput from '@/app/blog/components/form/ImageInput';
import { uploadImage } from '@/app/actions/staticResource';
import { getStaticResourceRoutes } from '@/util/ResourceServer';
import { updateOrganization } from '@/app/actions/organization';
import { useAppDispatch } from '@/lib/hooks';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '@/app/blog/components/popup/PopUp';

interface FormProps {
    organization: Organization
}

const GeneralEditForm = ({ organization }: FormProps) => {

    const [ formData, setFormData ] = useState<Organization>(organization);


    const dispatch = useAppDispatch();

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [ name ]: value
            }
        });
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.files) {
            const file = e.target.files[0];
            const form = new FormData();
            form.append("resource", file);
            const resourceId = await uploadImage(form);
            const resourePath = getStaticResourceRoutes().getOne(resourceId);
            formData.image = resourePath;

            const response = await updateOrganization(formData);
            setFormData(response);
        }
    }

    const handleFormAction = async (form: FormData) => {

        const response = await updateOrganization(formData);
        setFormData(response);

        dispatch(addPopup({
            id: getUniqueId(),
            message: "Saved the organization",
            type: PopupType.SUCCESS
        }));
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
            <ImageInput
                name="image"
                value={formData.image}
                onChange={e => handleImageChange(e as React.ChangeEvent<HTMLInputElement>)}
                id={`org-image-${formData.id}`}
            />
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
        <form 
            className={`full-body hide-scrollbar y-axis-flex`}
            action={handleFormAction}
        >
            { content }
            <button className={`button`}>Save</button>
        </form>
    )
}

export default GeneralEditForm;