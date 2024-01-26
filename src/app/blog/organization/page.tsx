import { getAllOrganizations } from '@/app/actions/organization';
import OrganizationListing from './OrganizationListing';

const OrganizationPage = async () => {
    
    const organizations = await getAllOrganizations();

    return (
        <OrganizationListing organizations={organizations} />
    )
}

export default OrganizationPage;