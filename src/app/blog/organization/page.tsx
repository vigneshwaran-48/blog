import { getAllOrganizations } from '@/app/actions/organization';
import OrganizationListing from './OrganizationListing';
import { Metadata } from 'next';
import NoOrganizations from './NoOrganizations';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Organizations",
        description: `Organizations of the user`
    }
}

const OrganizationPage = async () => {
    
    const organizations = await getAllOrganizations();

    return (
        organizations && organizations.length > 0 ? (
            <OrganizationListing organizations={organizations} />
        )
        : <NoOrganizations />
    )
}

export default OrganizationPage;