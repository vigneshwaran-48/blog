import { redirect } from 'next/navigation';

const page = ({ params: { id }}: { params: { id: number }}) => {
    redirect(`/organization/${id}/settings/edit`);
}

export default page;