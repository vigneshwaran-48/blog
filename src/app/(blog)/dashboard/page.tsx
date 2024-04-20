import { redirect } from 'next/navigation';

const page = () => {
    redirect("/dashboard/following?users");
}

export default page;
