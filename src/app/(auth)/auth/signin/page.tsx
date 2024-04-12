import React from 'react'
import SignupPage from './SigninPage';

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

const page = ({ searchParams } : Props) => {

    const error = searchParams ? searchParams["error"] as string : undefined;
    const callbackUrl = searchParams ? searchParams["callbackUrl"] as string : undefined;

    return <SignupPage error={error} callbackUrl={callbackUrl} />
}

export default page;