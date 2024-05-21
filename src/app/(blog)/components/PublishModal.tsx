import React, { useEffect, useRef, useState } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { applyTagsToBlog } from '@/app/actions/tag';

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
    }

    const onRemoveTag = (id: string) => {
        setBlogTags(prevBlogTags => {
            return prevBlogTags.filter(tag => tag.id !== id);
        });
        setTagsToShow(prevTagsToShow => {
            prevTagsToShow.push(tags.find(tag => tag.id === id) as Tag);
            return [...prevTagsToShow];
        });
    }

    const onPublish = async () => {
        if(!blogId) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: "No blog to publish"}));
            return;
        }

        const tagsAddedResponse = await applyTagsToBlog(blogId as string, blogTags.map(tag => tag.id));
        if(tagsAddedResponse.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: tagsAddedResponse.error }));
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

    const onEdit = async () => {
        
    }

    const items = profiles.map(profile => ({ id: profile.id + "", displayName: profile.profileId }));

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
                    <TagsDropdown tags={tagsToShow} selectedTags={blogTags} onApplyTag={onApplyTag} onRemoveTag={onRemoveTag} />
                </div>
                <Button displayName="Publish" loadingText="Publishing ..." onClick={onPublish} backgroundColor="#128B10" />
            </div>
        </div>
    )
}

const TagsDropdown = ({ tags, selectedTags, onApplyTag, onRemoveTag }: { tags: Tag[], selectedTags: Tag[], onApplyTag: (id: string) => void, onRemoveTag: (id: string) => void }) => {

    const [ showDropdown, setShowDropdown ] = useState<boolean>(false);
    const [ searchedTags, setSearchedTags ] = useState<Tag[]>([]);
    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const foucusOutHandler = (e: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        }
        window.addEventListener("click", foucusOutHandler);
        return (() => {
            window.removeEventListener("click", foucusOutHandler);
        });
    }, []);

    useEffect(() => {
        setSearchedTags(tags);
    }, [tags]);

    const handleSearchTags = (query: string) => {
        setSearchedTags(() => {
            return tags.filter(tag => tag.name.toLowerCase().includes(query.toLowerCase()));
        });
    }

    const tagList = searchedTags.map((tag, key) => 
        <li className="p-2 bg-[--app-background-color] border-b border-[transparent] cursor-pointer transition-all hover:border-[--app-light-background-color]" 
            key={key}
            onClick={() => onApplyTag(tag.id)}
        >{tag.name}</li>
    );

    const selectedElems = selectedTags.map(tag => {
        return (
            <div key={tag.id} className={`m-1 w-fit p-1 bg-[--app-light-background-color] rounded flex flex-shrink-0 items-center justify-between`}>
                <p className="mr-1">{ tag.name }</p>
                <FontAwesomeIcon 
                    icon={faXmark} 
                    onClick={() => onRemoveTag(tag.id)}
                    className="cursor-pointer"
                />
            </div>
        )
    })

    return (
        <div ref={dropDownRef} className={`${styles.tagDropdownContainer} w-[230px] relative`}>
            <div className={`flex flex-wrap h-fit border`}>
                <div className={`flex flex-wrap`}>
                    { selectedElems }
                </div>
                <input 
                    type="text" 
                    onFocus={() => setShowDropdown(true)} 
                    className="w-full p-2 outline-none bg-transparent" 
                    onChange={e => handleSearchTags(e.target.value)}
                />
            </div>
            <ul className={`w-full absolute top-[100%] ${showDropdown ? "h-[205px]" : "h-[0px]"} transition-all overflow-y-scroll`}>
                { tagList }
            </ul>
        </div>
    )
}

export default PublishModal;