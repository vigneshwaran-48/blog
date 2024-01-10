"use server";

import { APIRoutes } from "@/util/AppTypes";
import { getOrganizationResourceRoutes } from "@/util/ResourceServer";
import { authOptions } from "@/util/authOptions";
import { getTokenFromSession } from "@/util/getTokenFromSession";
import { isAuthenticated } from "@/util/isAuthenticated";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Organization } from "@/util/AppTypes";

export async function getAllOrganizations() {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    console.log(accessToken);


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
        return data.organization;
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
    throw new Error("Error while fetching organization details");
}