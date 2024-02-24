import { Organization } from '@/util/AppTypes';
import Image from 'next/image';
import React from 'react'
import bannerStyles from "./banner.module.css";

const OrganizationProfileBanner = ({ organization }: { organization: Organization }) => {

    return (
        <div className={`${bannerStyles.banner} full-width y-axis-flex`}>
            <Image 
                src={organization.image || "/person.jpg"} 
                alt="User Profile" 
                width={120} 
                height={120} 
            />
            <button className={`button`}>Follow</button>
            <h1>{ organization.name }</h1>
            <p>{ organization.description }</p>
        </div>
    )
}

export default OrganizationProfileBanner;