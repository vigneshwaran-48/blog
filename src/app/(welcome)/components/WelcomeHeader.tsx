import React from 'react'
import styles from "./page.module.css";

const WelcomeHeader = () => {

    return (
        <header className={`${styles.welcomeHeader} full-width`}>
            <nav className="full-width x-axis-flex">
                <h1>Blog</h1>
                <button className={`${styles.getStartedButton} button`}>Get Started</button>
            </nav>
        </header>
    )
}

export default WelcomeHeader;