import React from 'react'

const SmallBlogSkeleton = () => {
    return (
        <div className="w-full flex flex-col p-2">
            <div className="flex w-full items-center">
                <span className="w-[25px] h-[25px] rounded-full mr-1 bg-[--app-light-background-color]"></span>
                <p className="text-[14px] font-semibold w-[80%] p-2 bg-[--app-light-background-color]"></p>
            </div>
            <p className="font-bold w-[80%] my-2 p-2 bg-[--app-light-background-color]"></p>
        </div>
    )
}

export default SmallBlogSkeleton;