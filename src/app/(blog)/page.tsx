import { Metadata } from 'next'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata : Metadata = {
    title: "Home",
    description: "Blog app's home page"
}

export default async function HomePage() {
    const session = await getServerSession();
    if (session) {
        redirect("/feeds");
    }
    redirect("/welcome");
}
