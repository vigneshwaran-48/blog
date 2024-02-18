import { getProfile } from '@/app/actions/profile';
import { Blog, Profile } from '@/util/AppTypes';
import { Metadata } from 'next';
import React from 'react';
import styles from "./page.module.css";
import UserProfileBanner from './comp/UserProfileBanner';
import { getUser } from '@/app/actions/user';
import OrganizationProfileBanner from './comp/OrganizationProfileBanner';
import { getBlogsOfUser } from '@/app/actions/blog';
import ProfileBlog from './comp/ProfileBlog';
import { getOrganization } from '@/app/actions/organization';

interface Props {
    params: { profileId: string }
}

export async function generateMetadata({ params: { profileId } }: Props): Promise<Metadata> {

    const profile: Profile = await getProfile(profileId);

    return {
        title: `${profile.profileId}`,
        description: `${profile.profileId} profile page`
    }
}

const ProfileType = {
    USER: "USER",
    ORGANIZATION: "ORGANIZATION"
}

const page = async ({ params: { profileId } }: Props) => {

    const profile: Profile = await getProfile(profileId);

    let blogs: Blog[] = [];

    if(profile.type === ProfileType.USER) {
        blogs = await getBlogsOfUser(profile.entityId);
    }

    const blogElems = blogs && blogs.map((blog, key) => <ProfileBlog key={key} profileId={profileId} blog={blog} />);

    return (
        <div className={`${styles.page} full-body hide-scrollbar y-axis-flex`}>
            <div className={`${styles.header} y-axis-flex full-width`}>
                <div className={`${styles.headerBackground} full-width`}>
                    <img src={profile.bannerImage} alt="Profile banner" />
                </div>
                {
                    profile.type === ProfileType.USER 
                        ?   <UserProfileBanner user={await getUser(profile.entityId)} />
                        :   <OrganizationProfileBanner 
                                organization={await getOrganization(Number.parseInt(profile.entityId))}
                            />
                }
            </div>
            <div className={`${styles.blogContainer} x-axis-flex`}>
                { blogElems }
            </div>
        </div>
    )
}

export default page;