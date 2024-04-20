import { redirect } from 'next/navigation';

const page = () => {
    redirect("/dashboard/following");
}

export default page;
