import React from 'react'
import styles from "./page.module.css";

const WelcomeHeader = () => {

    console.log(styles);

    return (
        <header className={styles.welcomeHeader}>
            <nav className="full-width x-axis-flex">
                <h1>Blog</h1>
                <button className="button">Get Started</button>
            </nav>
        </header>
    )
}

export default WelcomeHeader;