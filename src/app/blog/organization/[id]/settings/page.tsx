import { getOrganization } from '@/app/actions/organization';
import { Organization } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";
import Image from 'next/image';

interface Props {
    params: { id: number }
}

const page = async ({ params: { id }}: Props) => {

    const organization: Organization = await getOrganization(id);
    
    return (
        <div className={`${styles.infoContainer} hide-scrollbar y-axis-flex`}>
            <Image 
                src={organization.image || "/person.jpg"}
                alt="Organization"
                width={150}
                height={150}
            />
            <h2>{ organization.name }</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, dicta sunt. Laudantium perspiciatis aperiam iure. Reiciendis iste quos cum quo nostrum, obcaecati soluta nemo fugit exercitationem repudiandae? Laudantium, itaque suscipit!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptatem adipisci sequi quas mollitia molestiae facere, laudantium eos. Ipsam quod delectus architecto dolore rem cumque aliquid. Itaque velit quas nihil!
            </p>
            <div className={`${styles.attributes} x-axis-flex`}>
                <p>Visibility:</p>
                <p>{ organization.visibility }</p>
            </div>
            <div className={`${styles.attributes} x-axis-flex`}>
                <p>Join Type:</p>
                <p>{ organization.joinType }</p>
            </div>
            <div className={`${styles.attributes} x-axis-flex`}>
                <p>Owner:</p>
                <p>{ organization.owner?.name }</p>
            </div>
        </div>
    )
}

export default page;