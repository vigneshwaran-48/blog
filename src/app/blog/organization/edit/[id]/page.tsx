import { redirect } from "next/navigation";

interface Props {
    params: { id: number }
}

const OrganizationGeneralPage = ({ params }: Props) => {
    redirect(`/blog/organization/edit/${params.id}/general`);
}

export default OrganizationGeneralPage;