"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setBlogImage, setContent, setTitle } from '@/lib/features/compose/composeSlice';
import styles from "./compose.module.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Input from "../components/form/Input";
import ImageInput from '../components/form/ImageInput';

const BlogComposeComp = () => {

    return (
        <div className={`${styles.composeArea} hide-scrollbar y-axis-flex`}>
            <BlogImage />
            <Title />
            <ContentArea />
        </div>
    )
}

const BlogImage = () => {

    const dispatch = useAppDispatch();

    const image = useAppSelector(state => state.composeSlice.image);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            dispatch(setBlogImage(fileReader.result as string));
        }

        if(e.target.files) {
            fileReader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <ImageInput
            value={ image }
            name="blog-compose-image"
            onChange={e => handleImageChange(e as React.ChangeEvent<HTMLInputElement>)}
        />
    )
}

const Title = () => {

    const dispatch = useAppDispatch();

    const title = useAppSelector(state => state.composeSlice.title);
    
    console.log(title);

    return (
        <Input 
            value={title}
            name="Title"
            onChange={text => dispatch(setTitle(text.target.value))}
            placeHolder='Title'
        />
    )
}

const ContentArea = () => {

    const dispatch = useAppDispatch();

    const content = useAppSelector(state => state.composeSlice.content);

    console.log(content);

    return (
        <ReactQuill 
            value={content} 
            onChange={content => dispatch(setContent(content))} 
            theme="snow"
            modules={{
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image'],
                    ['clean']
                ]
            }}
            placeholder="Today is a wonderful day"
        />
    )
}

export default BlogComposeComp;