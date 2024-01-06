"use client";

import React, { useState } from 'react';
import styles from "./page.module.css";
import Checkbox from '@/app/blog/components/form/Checkbox';
import Input from '@/app/blog/components/form/Input';
import TextArea from '@/app/blog/components/form/TextArea';
import RadioButton from '@/app/blog/components/form/RadioButton';

interface OrgCreationForm {
    name: string,
    description: string,
    testing: boolean
}

const OrganizationCreationForm = () => {

    const [ formData, setFormData ] = useState<OrgCreationForm>({
        name: "",
        description: "",
        testing: false
    });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name } = e.target;

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [ name ]: !prevFormData.testing
            }
        });
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

                <Checkbox 
                    name="testing"
                    displayName="Testing"
                    checked={formData.testing}
                    onChange={handleCheckboxChange}
                />

                <RadioButton 
                    name="testing"
                    displayName="Testing"
                    checked={formData.testing}
                    onChange={handleCheckboxChange}
                />
            </div>
            <nav className={`${styles.organizationCreationNavbar} full-width x-axis-flex`}>
                <button className={`button`}>Previous</button>
                <button className={`button`}>Next</button>
            </nav>
        </div>
    )
}

export default OrganizationCreationForm;