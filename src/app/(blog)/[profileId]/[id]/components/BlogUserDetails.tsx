import { UserMeta } from '@/util/AppTypes';
import React from 'react';
import styles from "./blogUser.module.css";
import Image from 'next/image';
import Link from 'next/link';

const BlogUserDetails = ({ user, postedOn, profileId }: { user: UserMeta, postedOn: string, profileId: string }) => {
    return (
        <div className={`${styles.blogUserDetails} x-axis-flex`}>
            <Link href={`/${profileId}`} className="rounded-full">
                <Image
                    src={user.image || "/person.jpg"}
                    alt="Blog posted user"
                    width={40}
                    height={40}
                    className="w-full h-full rounded-full"
                />
            </Link>
            <div className={`${styles.nameAndPostedTime} y-axis-flex`}>
                <Link href={`/${profileId}`}>
                    <h4 className="font-bold hover:underline">{ user.name }</h4>
                </Link>
                <p>Posted { postedOn }</p>
            </div>
        </div>
    )
}

export default BlogUserDetails;