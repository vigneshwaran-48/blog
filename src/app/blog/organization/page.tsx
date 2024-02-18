import { getAllOrganizations } from '@/app/actions/organization';
import OrganizationListing from './OrganizationListing';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Organizations",
        description: `Organizations of the user`
    }
}

const OrganizationPage = async () => {
    
    const organizations = await getAllOrganizations();

    return (
        <OrganizationListing organizations={organizations} />
    )
}

export default OrganizationPage;