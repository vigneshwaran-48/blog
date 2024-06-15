import React from 'react';
import FeatureSection from './FeatureSection';

const WelcomePage = () => {
    return (
        <div className={`w-full h-[calc(100%-40px)] flex flex-col items-center`}>
            <div className="flex flex-col">
                <h1 className="my-6 text-center text-5xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-300">
                    Share Your Voice with the World
                </h1>
                <p className="mt-4 text-center text-gray-700 max-w-2xl">
                    Experience seamless blogging with advanced features like organizational roles, user and organization follow notifications, and comprehensive search functionality. Easily create and manage posts, tag content, and connect with a vibrant community.
                </p>
            </div>
            <div className="w-full flex justify-center">
                <img 
                    src="/welcome/blog-app-feeds.png" 
                    alt='Blog App Feeds page' 
                    className="max-w-[600px] w-[95%] h-fit my-4"
                />
            </div>
            <div className="w-full max-w-[1200px]">
                <FeatureSection 
                    image={"/Organizations.png"} 
                    heading={"Organizations"} 
                    content={"The organizations feature of your blog application enables seamless collaboration by allowing users to create and manage groups with defined roles and permissions. Administrators can assign roles like editors and contributors, ensuring efficient content workflows. This feature supports both private and public settings, making it perfect for teams, businesses, and communities to manage and publish content collaboratively and effectively."}
                />
                <FeatureSection 
                    image={"/Manage-org-members.png"} 
                    heading={"Manage Organization Users"} 
                    content={"The members roles feature in your blog application's organizations functionality allows administrators to assign specific roles, such as editors, contributors, and viewers, to different members. This ensures a streamlined workflow by defining clear responsibilities and permissions for each role, enhancing collaboration and maintaining order within the organization."}
                    isRight={false}
                />
            </div>
        </div>
    )
}

export default WelcomePage
