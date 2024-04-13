"use client";

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

const SignupPage = ({ error, callbackUrl }: { error: string | undefined, callbackUrl: string | undefined }) => {

    const handleSignin = () => {
        if (callbackUrl) {
            signIn("google", { callbackUrl })
        } else {
            signIn("google", { callbackUrl: `${window.location.origin}` });
        }
    }

    return (
        <div className="flex flex-col justify-end items-center p-4 w-full h-full">
            {
                error &&
                <div className="w-3/4 border text-center border-[red] p-2 rounded-md mb-[40px]">
                    <p className="text-[20px] text-[red]"> {error} </p>
                </div>
            }

            <div className="w-[90%] h-3/4 sm:w-3/4">
                <div
                    className="flex w-full mb-4 p-2 rounded-lg transition cursor-pointer items-center hover:bg-[--app-light-background-color]"
                    onClick={handleSignin}
                >
                    <Icon link="/auth-icons/google.svg" />
                    <p className="ml-2 text-[22px] font-serif">Continue with google</p>
                </div>
                <div className="flex w-full mb-4 p-2 rounded-lg transition cursor-pointer items-center hover:bg-[--app-light-background-color]">
                    <Icon link="/auth-icons/github.svg" />
                    <p className="ml-2 text-[22px] font-serif">Continue with github</p>
                </div>
                <div className="flex w-full mb-4 p-2 rounded-lg transition cursor-pointer items-center hover:bg-[--app-light-background-color]">
                    <Icon link="/auth-icons/facebook.svg" />
                    <p className="ml-2 text-[22px] font-serif">Continue with facebook</p>
                </div>
            </div>
        </div>
    )
}

const Icon = ({ link }: { link: string }) => {

    return (
        <Image
            src={link}
            alt="Google"
            width={50}
            height={50}
        />
    )
}


export default SignupPage;