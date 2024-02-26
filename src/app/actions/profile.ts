"use server";

import { APIRoutes } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getProfileResourceRoutes } from "@/util/ResourceServer";
import { redirect } from "next/navigation";

export const getProfile = async (id: string) => {

    const routes: APIRoutes = getProfileResourceRoutes();

    const response = await sendRequest({ url: routes.getOne(id), method: "GET", includeBody: false });

    if(response.ok) {
        const data = await response.json();

        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.profile;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while fetching profile");
}

export const getAllProfiles = async () => {
    const routes: APIRoutes = getProfileResourceRoutes();

    const response = await sendRequest({ url: routes.get, method: "GET", includeBody: false });

    if(response.ok) {
        const data = await response.json();

        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.profiles;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while fetching profiles");
}