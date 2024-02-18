"use server";

import { Prefernces } from "@/lib/features/settings/preferencesSlice";
import { getUserResourceRoutes } from "@/util/ResourceServer";
import { sendRequest } from "@/util/RequestUtil";
import { UserMeta } from "@/util/AppTypes";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const getAllUsers = async () => {

    const routes = getUserResourceRoutes();

    const response = await sendRequest({ url: routes.get, method: "GET", includeBody: false });

    if(response.ok) {
        const data = await response.json();
                        
        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.users;
    }
    throw new Error("Error while fetching users details");

}

export const getUserProfile = async () => {

    const routes = getUserResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}/profile`, method: "GET", includeBody: false });

    if(response.ok) {
        const data = await response.json();
                                                
        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.user;
    }
    throw new Error("Error while fetching users details");
}

export const getUserPreferences = async () => {

    return {
        theme: "LIGHT",
        lang: "en"
    } as Prefernces
}

export const updateUser = async (user: UserMeta) => {

    const routes = getUserResourceRoutes();

    const response = await sendRequest({
        url: routes.put,
        method: "PATCH",
        includeBody: true, 
        body: JSON.stringify(user),
        contentType: "application/json"
    });

    const data = await response.json();
    if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    const userResponse = data.user;
    revalidatePath(`/blog/${userResponse.profileId}`)
    return data; 
}

export const getUser = async (id: string) => {

    const routes = getUserResourceRoutes();

    const response = await sendRequest({ url: routes.getOne(id), method: "GET", includeBody: false });

    if(response.ok) {
        const data = await response.json();
                                                
        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.user;
    }
    throw new Error("Error while fetching user details");
}