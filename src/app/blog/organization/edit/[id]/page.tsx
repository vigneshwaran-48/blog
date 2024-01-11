"use client";
import { useRouter } from 'next/navigation';

const OrganizationEditPage = () => {

    const router = useRouter();

    console.log("Path => " + location.pathname)

    router.push(location.pathname + "/general");
}

export default OrganizationEditPage;