import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import styles from "./page.module.css";

interface Props {
    goBackLink: string,
    text: string
}

const Goback = ({ goBackLink, text }: Props) => {

    return (
        <div className={`${styles.header} x-axis-flex`}>
            <Link href={goBackLink}>
                <FontAwesomeIcon icon={faArrowLeftLong} />
            </Link>
            <h2>{ text }</h2>
        </div>
    );
}

export default Goback;