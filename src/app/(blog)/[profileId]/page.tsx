import { getProfile } from '@/app/actions/profile';
import { Blog, Profile, UserMeta } from '@/util/AppTypes';
import { Metadata } from 'next';
import React from 'react';
import styles from "./page.module.css";
import { getUser, getUserProfile } from '@/app/actions/user';
import { getAllBlogsOfProfile } from '@/app/actions/blog';
import ProfileBlog from './comp/ProfileBlog';
import { getOrganization } from '@/app/actions/organization';
import ProfileBanner from './comp/ProfileBanner';
import { getFollowersOfProfile } from '@/app/actions/follow';

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

    const [ profile, blogs, followers, userProfile ] = await Promise.all([ 
                                                getProfile(profileId), 
                                                getAllBlogsOfProfile(profileId), 
                                                getFollowersOfProfile(profileId),
                                                getUserProfile()
                                        ]);

    const blogElems = blogs && blogs.map((blog: Blog, key: number) => 
                                    <ProfileBlog key={key} profileId={profileId} blog={blog} />);

    let user;
    let organization;

    if(profile.type === ProfileType.USER) {
        user = await getUser(profile.entityId);
    }
    else {
        organization = await getOrganization(profile.entityId);
    }

    const isFollowing = followers.findIndex((follower: UserMeta) => follower.profileId === userProfile.profileId) >= 0;

    return (
        <div className={`${styles.page} full-body hide-scrollbar y-axis-flex`}>
            <div className={`${styles.header} y-axis-flex full-width`}>
                <div className={`${styles.headerBackground} full-width`}>
                    <img src={profile.bannerImage} alt="Profile banner" />
                </div>
                {
                    profile.type === ProfileType.USER 
                        ?   <ProfileBanner 
                                profileId={user.profileId} 
                                image={user.image} 
                                name={user.name} 
                                description={user.description}
                                isFollowing={isFollowing}
                            />
                        :   <ProfileBanner 
                                profileId={organization.profileId} 
                                image={organization.image} 
                                name={organization.name} 
                                description={organization.description}
                                isFollowing={isFollowing}
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