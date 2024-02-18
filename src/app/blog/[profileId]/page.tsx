import { getProfile } from '@/app/actions/profile';
import { Profile } from '@/util/AppTypes';
import { Metadata } from 'next';
import React from 'react';

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

const page = async ({ params: { profileId } }: Props) => {

    const profile: Profile = await getProfile(profileId);

    console.log(profile);

    return (
        <div>
            { profile.name }
        </div>
    )
}

export default page;