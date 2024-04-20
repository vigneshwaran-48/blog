"use server";

import { APIRoutes } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getOrganizationResourceRoutes, getProfileResourceRoutes, getUserResourceRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const followProfile = async (id: string) => {

    const routes: APIRoutes = getProfileResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/follow`, method: "POST", includeBody: false });

    const data = await response.json();

    if (data.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath(`/${id}`);
    return data;
}

export const getFollowersOfProfile = async (id: string) => {
    const routes: APIRoutes = getProfileResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/follow`, method: "GET", includeBody: false });

    const data = await response.json();

    if (data.status === 401) {
        redirect("/auth/signin");
    }
    return data.followers;
}

export const unFollowProfile = async (id: string) => {

    const routes: APIRoutes = getProfileResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/follow`, method: "DELETE", includeBody: false });

    const data = await response.json();

    if (data.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath(`/${id}`);
    return data;
}

export const getFollowingUsers = async () => {
    const routes: APIRoutes = getUserResourceRoutes();
    
    const response = await sendRequest({ url: `${routes.get}/following`, method: "GET", includeBody: false });
    
    const data = await response.json();
    
    if (data.status === 401) {
        redirect("/auth/signin");
    }
    return data.users;
}

export const getFollowingOrganizations = async () => {
    const routes: APIRoutes = getOrganizationResourceRoutes();
    
    const response = await sendRequest({ url: `${routes.get}/following`, method: "GET", includeBody: false });
    
    const data = await response.json();
    
    if (data.status === 401) {
        redirect("/auth/signin");
    }
    return data.organizations;
}