import React from 'react'
import styles from "../blog/page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faMinus } from '@fortawesome/free-solid-svg-icons';

const BlogboxSkeleton = () => {
    return (
        <article className={`${styles.blogMeta} border-b mb-10 h-[170px] y-axis-flex`}>
            <div className={`${styles.blogMetaHeader} x-axis-flex`}>
              
                <span className="w-[24px] h-[24px] bg-[--app-light-background-color] rounded-full mr-2"></span>
                <p className="p-2 w-[120px] bg-[--app-light-background-color]"></p>
            </div>

            <div className={`${styles.blogContent} x-axis-flex`}>
                <div>
                    <h2 className="font-bold text-2xl w-[200px] p-3 bg-[--app-light-background-color]" title="title"></h2>
                    <p className="w-[400px] h-[50px] bg-[--app-light-background-color]"></p>
                </div>
                <span className="w-[70px] h-[70px] bg-[--app-light-background-color]"></span>
            </div>
                
            <div className={`${styles.blogFooter} x-axis-flex`}>
                <div className={`${styles.categoryContainer} hide-scrollbar x-axis-flex`}>
                    <span className="p2 bg-[--app-light-background-color] w-[40px] h-[20px] mr-2"></span>
                    <span className="p2 bg-[--app-light-background-color] w-[40px] h-[20px]"></span>
                </div>
                <div className={`${styles.otherActionsContainer} x-axis-flex`}>
                    <span title="bookmark this blog">
                        <FontAwesomeIcon icon={faBookmark} />
                    </span>
                    <span title="Don't Like this type blog">
                        <FontAwesomeIcon icon={faMinus} />
                    </span>
                </div>
            </div>
        </article>
    )
}

export default BlogboxSkeleton;