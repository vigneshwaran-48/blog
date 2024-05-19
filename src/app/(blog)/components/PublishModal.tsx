import React, { useEffect, useState } from 'react';
import styles from "./publishBlog.module.css";
import Dropdown from './form/Dropdown';
import { ProfileId, Tag } from '@/util/AppTypes';
import { getAllProfiles } from '@/app/actions/profile';
import { publishBlog } from '@/app/actions/blog';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getUniqueId } from '@/util/getUniqueId';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { PopupType } from './popup/PopUp';
import { useRouter } from 'next/navigation';
import Button from './form/Button';

interface Props {
    isOpen: boolean,
    onClose: () => void
}

const PublishModal = ({ isOpen, onClose }: Props) => {

    const blogId = useAppSelector(state => state.composeSlice.id);
    const tags = useAppSelector(state => state.tagSlice);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [ profiles, setProfiles ] = useState<ProfileId[]>([]);
    const [ publishAtProfile, setPublishAtProfile ] = useState<ProfileId>();
    const [ blogTags, setBlogTags ] = useState<Tag[]>([]);
    const [ tagsToShow, setTagsToShow ] = useState<Tag[]>([]);

    useEffect(() => {
        fetchProfiles();
    }, [isOpen]);

    useEffect(() => {
        setTagsToShow(tags.filter(tag => blogTags.findIndex(blogTag => blogTag.id === tag.id) < 0));
    }, [tags])

    const fetchProfiles = async () => {
        const profiles: ProfileId[] = await getAllProfiles();
        setProfiles(profiles);
        setPublishAtProfile(profiles[0]);
    }

    const onDropDownSelect = (id: string) => {
        setPublishAtProfile(profiles.find(profile => profile.id === Number.parseInt(id)));
    }

    const onApplyTag = (id: string) => {
        setBlogTags(prevBlogTags => {
            prevBlogTags.push(tags.find(tag => tag.id === id) as Tag);
            return [...prevBlogTags];
        });
        setTagsToShow(prevTagsToShow => {
            return prevTagsToShow.filter(prevTag => prevTag.id !== id);
        });
        console.log(id)
    }

    const onPublish = async () => {
        if(!blogId) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: "No blog to publish"}));
            return;
        }
        const response = await publishBlog(blogId, publishAtProfile?.profileId as string);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(addPopup({ id: getUniqueId(), type: PopupType.SUCCESS, message: response.message }));
        router.push(`/${publishAtProfile?.profileId}/${blogId}`);
    }

    const items = profiles.map(profile => ({ id: profile.id + "", displayName: profile.profileId }));

    const tagList = tagsToShow.map((tag, key) => 
        <li className="p-2 bg-[--app-background-color] border-b border-[transparent] cursor-pointer transition-all hover:border-[--app-light-background-color]" 
            key={key}
            onClick={() => onApplyTag(tag.id)}
        >{tag.name}</li>
    );

    return (
        <div className={`flex ${styles.publishModal} ${isOpen ? styles.showModal : "hidden"} full-body`}>
            <div 
                className={`${styles.background} full-body`}
                onClick={e => onClose()}
            ></div>
            <div className={`${styles.modal} y-axis-flex`}>
                <div className={`${styles.modalRow} x-axis-flex full-width`}>
                    <p>Publish At</p>
                    <Dropdown items={items} onSelect={onDropDownSelect} />
                </div>
                <div className={`${styles.modalRow} x-axis-flex full-width`}>
                    <p>Tags</p>
                    <div className={`${styles.tagDropdownContainer} relative`}>
                        <input type="text" className="w-full p-2 border outline-none" />
                        <ul className="w-full absolute top-[100%] h-[0px] transition-all overflow-y-scroll">
                            { tagList }
                        </ul>
                    </div>
                </div>
                {/* <button className={`button`} onClick={onPublish}>Publish</button> */}
                <Button displayName="Publish" loadingText="Publishing ..." onClick={onPublish} backgroundColor="#128B10" />
            </div>
        </div>
    )
}

export default PublishModal;