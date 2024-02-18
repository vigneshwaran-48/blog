import { redirect } from 'next/navigation';

const SettingsPage = () => {
    redirect("/blog/settings/profile");
}

export default SettingsPage;