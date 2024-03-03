"use server";

import { APIRoutes } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getBlogResourceRoutes } from "@/util/ResourceServer";
import { redirect } from "next/navigation";

export const getCommentsOfBlog = async (id: number) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/comment`, method: "GET", includeBody: false });
    
    const data = await response.json();

    if(data.status === 401) {
        redirect("/api/auth/signin");
    }
    return data.comments;
}