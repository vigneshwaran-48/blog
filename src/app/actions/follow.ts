"use server";

import { APIRoutes } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getProfileResourceRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const followProfile = async (id: string) => {

    const routes: APIRoutes = getProfileResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/follow`, method: "POST", includeBody: false });
    
    const data = await response.json();

    if(data.status === 401) {
        redirect("/api/auth/signin");
    }
    revalidatePath(`/blog/${id}`);
    return data;
}

export const getFollowersOfProfile = async (id: string) => {
    const routes: APIRoutes = getProfileResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/follow`, method: "GET", includeBody: false });
    
    const data = await response.json();

    if(data.status === 401) {
        redirect("/api/auth/signin");
    }
    return data.followers;
}

export const unFollowProfile = async (id: string) => {

    const routes: APIRoutes = getProfileResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/follow`, method: "DELETE", includeBody: false });
    
    const data = await response.json();

    if(data.status === 401) {
        redirect("/api/auth/signin");
    }
    revalidatePath(`/blog/${id}`);
    return data;
}