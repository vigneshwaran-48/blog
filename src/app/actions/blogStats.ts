"use server";

import { APIRoutes } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getBlogResourceRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const setBlogReadTime = (id: string, time: number) => {
    
}

export const setBlogView = async (profileId: string, blogId: string) => {

    const routes: APIRoutes = getBlogResourceRoutes(); 

    const response = await sendRequest({
        url: `${routes.getOne(blogId)}/stats/view`,
        method: "POST",
        includeBody: false,
        checkAuthentication: false
    });

    const data = await response.json();
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath(`/${profileId}/${blogId}`);
    return data;
}

export const getBlogViewStats = async (blogId: string) => {

    const routes: APIRoutes = getBlogResourceRoutes(); 

    const response = await sendRequest({
        url: `${routes.getOne(blogId)}/stats/view`,
        method: "GET",
        includeBody: false,
        checkAuthentication: false
    });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.stats;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching blog view stats");
}

export const getAllBlogsViewStats = async () => {
    const routes: APIRoutes = getBlogResourceRoutes(); 

    const response = await sendRequest({
        url: `${routes.get}/stats/view`,
        method: "GET",
        includeBody: false,
        checkAuthentication: false
    });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.stats;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching all blog view stats");
}