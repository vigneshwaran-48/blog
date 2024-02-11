"use client";

import { uploadImage } from '@/app/actions/staticResource';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getStaticResourceRoutes } from '@/util/ResourceServer';
import { getUniqueId } from '@/util/getUniqueId';
import React from 'react'
import { PopupType } from '../../components/popup/PopUp';
import { setBlogImage } from '@/lib/features/compose/composeSlice';
import ImageInput from '../../components/form/ImageInput';

const BlogImage = () => {
    const dispatch = useAppDispatch();
    const image = useAppSelector(state => state.composeSlice.image);

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

    return (
        <ImageInput
            value={ image }
            name="blog-compose-image"
            onChange={e => handleImageChange(e as React.ChangeEvent<HTMLInputElement>)}
        />
    )
}

export default BlogImage;