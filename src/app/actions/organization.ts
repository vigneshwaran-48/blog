"use server";

import { APIRoutes } from "@/util/AppTypes";
import { getOrganizationResourceRoutes } from "@/util/ResourceServer";
import { authOptions } from "@/util/authOptions";
import { getTokenFromSession } from "@/util/getTokenFromSession";
import { isAuthenticated } from "@/util/isAuthenticated";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Organization } from "@/util/AppTypes";
import { revalidatePath } from "next/cache";

export async function getAllOrganizations() {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);


    const response = await fetch(routes.get, {
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`
                                }
                            });

    if(response.ok) {
        const data = await response.json();

        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.organizations;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while fetching organization details");
}

export async function createOrganization(organization: Organization) {
    const routes: APIRoutes = getOrganizationResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    const response = await fetch(routes.create, {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`,
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(organization)
                            });
    if(response.ok) {
        const data = await response.json();
                        
        if(data.status !== 201) {
            throw new Error(data.error);
        }
        revalidatePath("/blog/organization/list");
        revalidatePath("/blog/organization/edit");
        return data.organization;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while creating organization");
}

export const addUsersToOrganization = async (id: number, users: string[]) => {
    const routes: APIRoutes = getOrganizationResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    const params = new URLSearchParams();
    const usersCSV = users.join(",");
    
    params.set("usersToAdd", usersCSV);

    const response = await fetch(`${routes.getOne(id)}/user?${params.toString()}`, {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`,
                                    "Content-Type": "application/json"
                                }
                            });
    if(response.ok) {
        const data = await response.json();
                                                
        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.organizationUsers;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while adding users to organization");
}

export const getOrganization = async (id: number) => {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    const response = await fetch(routes.getOne(id), {
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`
                                }
                            });
    if(response.ok) {
        const data = await response.json();

        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.organization;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while fetching organization details");
}

export const getOrganizationsUserHasEditPermission = async () => {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    const searchParams = new URLSearchParams();
    searchParams.set("role", "ADMIN");

    const response = await fetch(`${routes.get}?${searchParams.toString()}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    if(response.ok) {
        const data = await response.json();

        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.organizations;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while fetching organization details");
}

export const updateOrganization = async (organization: Organization) => {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    const response = await fetch(routes.put, {
                                method: "PUT",
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`,
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(organization)
                            });
    const data = await response.json();

    if(data.status === 200) {
        revalidatePath(`/blog/organization/edit`);
        return data.organization;
    }
    throw new Error(data.error);
}

export const getUsersOfOrganization = async (id: number) => {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    const response = await fetch(`${routes.getOne(id)}/user`, {
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`
                                }
                            });
    if(response.ok) {
        const data = await response.json();
        return data.organizationUsers;
    }
}

export const updateUserRole = async (id: number, userId: string, role: string) => {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    const response = await fetch(`${routes.getOne(id)}/user/${userId}?role=${role}`, {
                                method: "PUT",
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`
                                }
                            });
    const data = await response.json();
    if(data.status === 200) {
        revalidatePath(`/blog/organization/edit/${id}/members`);
    }
    return data;
}