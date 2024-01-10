import { getOrganization } from '@/app/actions/organization';
import { BlogMeta, Organization } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import { Blog } from '@/app/blog/components/blog/Blog';

const OrganizationView = async ({params}: {params: {id: number}}) => {

    const { id } = params;

    const organization: Organization = await getOrganization(id);

    // Need to get this from backend organization API's response
    const organizationMoreInfo = {
        bannerImage: "/banner.jpg",
        bannerTextColor: "white"
    }

    const content: BlogMeta = {
        title: "Testing",
        postedUser: {
            id: "9990",
            name: "Vicky",
            image: "/person.jpg"
        },
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, culpa!",
        date: "2nd Jan",
        image: "/welcome-image.png",
        categories: ["learning", "teaching", "tech"]
    }

    return (
        <div className={`${styles.organizationComp} full-body y-axis-flex`}>
            <div className={`${styles.header} x-axis-flex full-width`}>
                <img src={organizationMoreInfo.bannerImage} alt="organization banner" />
                <h2 style={{color: organizationMoreInfo.bannerTextColor}}>{ organization.name }</h2>
            </div>

            <div className={`y-axis-flex`}>
                <Blog blog={content} />
            </div>
        </div>
    )
}

export default OrganizationView;