import { getFollowingTags } from '@/app/actions/tag';
import React from 'react'

const FollowingTags = async () => {

    const followingTags = await getFollowingTags();

    console.log(followingTags);

    return (
        <div>{ followingTags }</div>
    )
}

export default FollowingTags;