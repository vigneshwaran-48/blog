import React from 'react';
import styles from "./page.module.css";
import Link from 'next/link';

const WelcomePage = () => {
    return (
        <div className={`${styles.welcomePage} full-width y-axis-flex`}>
            <div className={`${styles.welcomeMessageContainer} full-width x-axis-flex`}>
                <div>
                    <h1>The Blog App that you&apos;ll need</h1>
                    <Link href="/blog">
                        <button className={`${styles.getStartedButton} button`}>Get Stared</button>
                    </Link>
                </div>
                <img src="/welcome-image.png" alt="App Welcome Image" />
            </div>
            <div className={`${styles.welcomePageInfoContainer} full-width x-axis-flex`}>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quae magni dolores fugiat odio? Maiores, dicta. Eligendi, fuga. Ipsa earum sed sapiente assumenda quo expedita nam suscipit aperiam enim totam.</p>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quae magni dolores fugiat odio? Maiores, dicta. Eligendi, fuga. Ipsa earum sed sapiente assumenda quo expedita nam suscipit aperiam enim totam.</p>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage