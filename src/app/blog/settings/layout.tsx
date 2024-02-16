import React from 'react'
import Navbar from './components/Navbar';
import styles from "./layout.module.css";

interface Props {
    children: React.ReactNode
}

const SettingsLayout = ({ children }: Props) => {
    return (
        <div className={`${styles.layout} x-axis-flex`}>
            <Navbar />
            <div className={`${styles.layoutBody}`}>
                { children }
            </div>
        </div>
    )
}

export default SettingsLayout;