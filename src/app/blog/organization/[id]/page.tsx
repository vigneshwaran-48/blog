import { getOrganization } from '@/app/actions/organization';
import { Blog, Organization } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import { BlogComp } from '@/app/blog/components/blog/BlogComp';
import { Metadata } from 'next';

interface Props {
    params: {id: number}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const organization: Organization = await getOrganization(params.id);

    return {
        title: organization.name,
        description: `${organization.name} view page`
    }
}

const OrganizationView = async ({params}: {params: {id: number}}) => {

    const { id } = params;

    const organization: Organization = await getOrganization(id);

    // Need to get this from backend organization API's response
    const organizationMoreInfo = {
        bannerImage: "/banner.jpg",
        bannerTextColor: "white"
    }

    const content: Blog = {
        id: 1,
        title: "Testing",
        owner: {
            id: "9990",
            name: "Vicky",
            image: "/person.jpg"
        },
        content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, culpa!",
        postedTime: "2nd Jan",
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
                <BlogComp blog={content} />
            </div>
        </div>
    )
}

export default OrganizationView;