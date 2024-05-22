"use client";

import { followTag, unFollowTag } from "@/app/actions/tag";
import Button from "../../components/form/Button";
import { useAppDispatch } from "@/lib/hooks";
import { addPopup } from "@/lib/features/popup/popupSlice";
import { getUniqueId } from "@/util/getUniqueId";
import { PopupType } from "../../components/popup/PopUp";

const FollowButtons = ({ tagId, isFollowing }: { tagId: string, isFollowing: boolean }) => {

    const dispatch = useAppDispatch();

    const followAction = async (isFollow: boolean) => {
        let response: any;
        if (isFollow) {
            response = await unFollowTag(tagId);
        } else {
            response = await followTag(tagId);
        }
        console.log(response)
        if (response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
    }

    return (
        isFollowing 
            ? <Button displayName="UnFollow" loadingText="UnFollowing ..." onClick={() => followAction(true)} />
            : <Button displayName="Follow" loadingText="Following ..." onClick={() => followAction(false)} />
    )
}

export default FollowButtons;