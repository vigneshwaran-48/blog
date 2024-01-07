import { Metadata } from 'next'
import { redirect } from 'next/navigation';

export const metadata : Metadata = {
    title: "Home",
    description: "Blog app's home page"
}

export default async function HomePage() {

    redirect("/blog/home");
}
