"use client";

import { followTag, unFollowTag } from "@/app/actions/tag";
import Button from "../../components/form/Button";

const FollowButtons = ({ tagId, isFollowing }: { tagId: string, isFollowing: boolean }) => {

    const followAction = async (isFollow: boolean) => {
        let response: any;
        if (isFollow) {
            response = followTag(tagId);
        } else {
            response = unFollowTag(tagId);
        }
        if (response.status !== 200) {
            disp
        }
    }

    return (
        isFollowing 
            ? <Button displayName="Follow" loadingText="Following ..." onClick={() => followAction(true)} />
            : <Button displayName="UnFollow" loadingText="UnFollowing ..." onClick={() => followAction(true)} />
    )
}

export default FollowButtons;