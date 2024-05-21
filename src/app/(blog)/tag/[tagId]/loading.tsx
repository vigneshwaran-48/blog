import BlogListingSkeleton from "../../components/skeleton/BlogListingSkeleton"
import SidebarSkeleton from "../../components/skeleton/SidebarSkeleton"

const loading = () => {
    return (
        <div className={`full-body flex`}>
            <BlogListingSkeleton />
            <SidebarSkeleton />
        </div>
    )
}

export default loading;