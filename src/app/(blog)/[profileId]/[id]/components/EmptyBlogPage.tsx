import React from 'react'

const EmptyBlogPage = ({ className }: { className: string }) => {
    return (
        <div className={`${className} flex flex-col sm:pt-[--app-main-page-padding-top] w-full`}>
            <div className={`h-[250px] w-full rounded-md bg-gray-500`}></div>
            <div className="flex py-2 items-center">
                <div className="w-[40px] h-[40px] rounded-full bg-gray-500"></div>
                <div className="flex flex-col p-2 justify-center">
                    <p className="p-2 bg-gray-500 w-[115px] my-1"></p>
                    <p className="p-1 bg-gray-500 w-[70px]"></p>
                </div>
            </div>
            <div className="h-[50px] border-t border-b">

            </div>
            <div className="flex flex-col">
                <p className="p-4 bg-gray-500 w-[40%] my-1"></p>
                <p className="p-2 mt-[20px] my-3 bg-gray-500 w-[80%] sm:"></p>
                <p className="p-2 my-3 bg-gray-500 w-[80%]"></p>
                <p className="p-2 my-3 bg-gray-500 w-[80%]"></p>
                <p className="p-2 my-3 bg-gray-500 w-[80%]"></p>
                <p className="p-2 my-3 bg-gray-500 w-[30%]"></p>
            </div>
        </div>
    )
}

export default EmptyBlogPage;