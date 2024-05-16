"use client";

import CircleLoader from '@/app/(blog)/components/loaders/CircleLoader';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react'

const SignupPage = ({ error, callbackUrl }: { error: string | undefined, callbackUrl: string | undefined }) => {

    const [ providerData, setProviderData ] = useState([
        {
            message: "Continue with google",
            icon: "/auth-icons/google.svg",
            isLoading: false,
            id: "vapps"
        },
        {
            message: "Continue with github",
            icon: "/auth-icons/github.svg",
            isLoading: false,
            id: "github"
        },
        {
            message: "Continue with facebook",
            icon: "/auth-icons/facebook.svg",
            isLoading: false,
            id: "facebook"
        }
    ]);

    const handleSignin = (id: string) => {
        setProviderData(prevData => {
            return prevData.map(provider => {
                if (provider.id === id) {
                    provider.isLoading = true;
                }
                return provider;
            });
        });
        if (callbackUrl) {
            signIn(id, { callbackUrl })
        } else {
            signIn(id, { callbackUrl: `${window.location.origin}` });
        }
    }

    const providers = providerData.map((provider, key) => {
        return (
            <div
                key={key}
                className="flex w-full mb-4 p-2 rounded-lg transition cursor-pointer items-center hover:bg-[--app-light-background-color]"
                onClick={() => handleSignin(provider.id)}
            >
                <Icon link={provider.icon} />
                <p className="ml-2 text-[22px] font-serif flex justify-center items-center w-[calc(100%-50px)]">
                    { provider.isLoading ? <CircleLoader width={40} height={40} /> : provider.message }
                </p>
            </div>
        )
    })

    return (
        <div className="flex flex-col justify-end items-center p-4 w-full h-full">
            {
                error &&
                <div className="w-3/4 border text-center border-[red] p-2 rounded-md mb-[40px]">
                    <p className="text-[20px] text-[red]"> {error} </p>
                </div>
            }

            <div className="w-[90%] h-3/4 sm:w-3/4">
                { providers }
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