"use client";

import { setLoginPopup } from '@/lib/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { faGem } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React from 'react'

const LoginPopup = () => {

    const showPopup = useAppSelector(state => state.userSlice.showLoginPopup);
    const dispatch = useAppDispatch();
    const router = useRouter();

    return (
        <div className={`fixed w-full h-full z-50 bg-[#000000b3] ${showPopup ? "flex" : "hidden"} justify-center items-center`}>
            <div className='flex max-w-[600px] w-[95%] bg-[--app-background-color] items-center p-2'>
                <div className="hidden sm:block sm:w-1/3 h-full">
                    <img src={"/app-icon.png"} alt="App icon" className="w-full h-full rounded-xl" />
                </div>
                <div className="flex flex-col w-full sm:w-2/3 h-full p-4">
                    <ol className="list-disc">
                        <li className="flex items-center my-2">
                            <FontAwesomeIcon icon={faGem} className="mr-2" />
                            <p>Access unlimited blogs a day.</p>
                        </li>
                        <li className="flex items-center my-2">
                            <FontAwesomeIcon icon={faGem} className="mr-2" />
                            <p>Create organization and colloborate with your team.</p>
                        </li>
                        <li className="flex items-center my-2">
                            <FontAwesomeIcon icon={faGem} className="mr-2" />
                            <p>Post blog to the world.</p>
                        </li>
                    </ol>
                    <div className="flex items-center py-2">
                        <button
                            className={`button bg-[--app-selected-background-color] text-[--app-selected-text-color] mr-2`}
                            onClick={() => router.push("/auth/signin")}
                            >Login</button>
                        <button 
                            className={`button bg-[--app-light-background-color] text-[--app-light-text-color]`}
                            onClick={() => dispatch(setLoginPopup(false))}
                        >Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPopup;