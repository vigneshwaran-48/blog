"use client";

import { uploadImage } from '@/app/actions/staticResource';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getStaticResourceRoutes } from '@/util/ResourceServer';
import { getUniqueId } from '@/util/getUniqueId';
import React, { useRef } from 'react'
import { PopupType } from '../../components/popup/PopUp';
import { setBlogImage } from '@/lib/features/compose/composeSlice';
import styles from "./blogImage.module.css";

const BlogImage = () => {
    const dispatch = useAppDispatch();
    const image = useAppSelector(state => state.composeSlice.image);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        if(!e.target.files) {
            return;
        }
        const form = new FormData();
        form.append("resource", e.target.files[0]);
        const resourceResponse = await uploadImage(form);

        if(resourceResponse.status !== 200 && resourceResponse.status !== 201) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: resourceResponse.error }));
            return;
        }
        const imageUrl = getStaticResourceRoutes().getOne(resourceResponse.id);
        dispatch(setBlogImage(imageUrl));
    }

    const handleImageButtonClick = () => {
        if(inputFileRef.current) {
            inputFileRef.current.click();
        }
    }

    return (
        <div className={`${styles.blogImage} x-axis-flex`}>
            <button 
                className={`button`}
                onClick={handleImageButtonClick}
            >Add Image</button>
            <input 
                type="file" 
                accept="image/*"
                ref={inputFileRef}
                onChange={handleImageChange}
            />
            <img src={image} width={100} height={100} alt="Blog header image" />
        </div>
    )
}

export default BlogImage;
