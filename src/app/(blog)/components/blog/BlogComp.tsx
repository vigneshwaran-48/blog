import { Blog } from '@/util/AppTypes';
import { NavLink } from '@/util/NavLink';
import { faBookmark, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import BlogContentComp from './BlogContentComp';
import styles from "./page.module.css";

export const BlogComp = ({ blog }: { blog: Blog }) => {

  const tags = blog.tags?.map(tag => {
    return (
      <div
        key={tag.id}
        className={`${styles.category} text-[14px] flex-shrink-0`}
        title="category"
      >{tag.name}</div>
    )
  });

  const title = blog.title.length > 30 ? blog.title.substring(0, 30) + "..." : blog.title;

  return (
    <NavLink className={`${styles.blogMeta} border-b mb-10 h-[180px]`} href={`/${blog.publishedAt?.profileId}/${blog.id}`}>
      <article className={` y-axis-flex`}>
        <div className={`${styles.blogMetaHeader} x-axis-flex`}>
          <Image
            src={blog.owner.image as string}
            alt="blogged user"
            width={24}
            height={24}
          />
          <b><p>{blog.owner.name || "Untitled Blog"}</p></b>
          <p>{blog.displayPostedDate}</p>
        </div>

        <BlogContentComp title={title} description={blog.description || ""} image={blog.image} />

        <div className={`${styles.blogFooter} x-axis-flex`}>
          <div className={`${styles.categoryContainer} hide-scrollbar x-axis-flex`}>
            {tags}
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
    </NavLink>
  )
}
