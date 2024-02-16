"use client";

import { useRouter } from 'next/navigation';

const SettingsPage = () => {
    const router = useRouter();
    router.push("/blog/settings/profile");
}

export default SettingsPage;