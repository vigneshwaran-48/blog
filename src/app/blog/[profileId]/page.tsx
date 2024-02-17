import { getProfile } from '@/app/actions/profile';
import { Profile } from '@/util/AppTypes';
import React from 'react';

interface Props {
    params: { profileId: string }
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