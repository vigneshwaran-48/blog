import { UserMeta } from '@/util/AppTypes';
import React from 'react';
import styles from "./blogUser.module.css";
import Image from 'next/image';

const BlogUserDetails = ({ user, postedOn }: { user: UserMeta, postedOn: string }) => {
    return (
        <div className={`${styles.blogUserDetails} x-axis-flex`}>
            <Image
                src={user.image || "/person.jpg"}
                alt="Blog posted user"
                width={40}
                height={40}
            />
            <div className={`${styles.nameAndPostedTime} y-axis-flex`}>
                <h4>{ user.name }</h4>
                <p>Posted { postedOn }</p>
            </div>
        </div>
    )
}

export default BlogUserDetails;