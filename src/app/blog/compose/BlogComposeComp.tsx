import React from 'react';
import styles from "./compose.module.css";
import ContentArea from './components/ContentArea';
import BlogImage from './components/BlogImage';
import Title from './components/Title';

const BlogComposeComp = () => {

    return (
        <div className={`${styles.composeArea} hide-scrollbar y-axis-flex`}>
            <BlogImage />
            <Title />
            <ContentArea />
        </div>
    )
}

export default BlogComposeComp;