"use server";

import { sendRequest } from "@/util/RequestUtil";
import { getTagResourceRoutes } from "@/util/ResourceServer";
import { redirect } from "next/navigation";

export const getFollowingTags = async () => {
    const routes = getTagResourceRoutes();
    
    const response = await sendRequest({ url: `${routes.get}/follow`, method: "GET", includeBody: false });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.tags;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching following tags");
}