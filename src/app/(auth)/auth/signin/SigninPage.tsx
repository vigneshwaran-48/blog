"use client";

import CircleLoader from '@/app/(blog)/components/loaders/CircleLoader';
import DolphinLoader from '@/app/(blog)/components/loaders/DolphinLoader';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const SignupPage = ({ error, callbackUrl }: { error: string | undefined, callbackUrl: string | undefined }) => {


    useEffect(() => {
        signIn("vapps", { callbackUrl })
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <DolphinLoader />
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