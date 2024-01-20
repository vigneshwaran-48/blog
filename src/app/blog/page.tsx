import { useAppDispatch } from '@/lib/hooks';
import { Metadata } from 'next'
import { redirect } from 'next/navigation';
import { getProfile } from '../actions/user';

export const metadata : Metadata = {
    title: "Home",
    description: "Blog app's home page"
}

export default async function HomePage() {

    redirect("/blog/home");
}
