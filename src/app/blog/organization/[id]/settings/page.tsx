import { redirect } from 'next/navigation';

const page = ({ params: { id }}: { params: { id: number }}) => {
    redirect(`/blog/organization/${id}/settings/edit`);
}

export default page;