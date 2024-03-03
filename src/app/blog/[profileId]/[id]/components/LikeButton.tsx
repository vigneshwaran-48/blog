import Image from 'next/image';
import React from 'react';
import styles from "./blogOptions.module.css";

interface Props {
    isLiked: boolean,
    likesCount: number,
    onRemoveLike: () => void,
    onLiked: () => void,
}

const notLikedIcon = "/heart.png";
const likedIcon = "/heart_full.png";

const LikeButton = ({ isLiked, likesCount, onRemoveLike, onLiked }: Props) => {
    return (
        <span className={`${styles.likesContainer} x-axis-flex`}>
            {
                isLiked 
                    ? <Image src={likedIcon} alt="liked icon" width={20} height={20} onClick={e => onRemoveLike()} /> 
                    : <Image src={notLikedIcon} alt="Not liked icon" width={20} height={20} onClick={e => onLiked()} />
            }
            <p>{ likesCount }</p>
        </span>
    )
}

export default LikeButton;