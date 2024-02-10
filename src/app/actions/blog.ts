"use server";

import { APIRoutes, Blog } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getBlogResourceRoutes } from "@/util/ResourceServer";
import { redirect } from "next/navigation";

export const addBlog = async (blog: Blog) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    console.log("Adding blog");

    const response = await sendRequest({
        url: routes.create,
        method: "POST",
        includeBody: true, 
        body: JSON.stringify(blog),
        contentType: "application/json"
    });

    const data = await response.json();
    if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    return data;
}