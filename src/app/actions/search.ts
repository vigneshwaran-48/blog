"use server";

import { APIRoutes } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getSearchResourceRoutes } from "@/util/ResourceServer";
import { redirect } from "next/navigation";

export const search = async (query: string, type: string, searchBy?: string) => {

    const routes: APIRoutes = getSearchResourceRoutes();

    const params = new URLSearchParams();
    params.set("query", query);
    params.set("type", type);
    if (searchBy) {
        params.set("searchBy", searchBy);
    }
    const response = await sendRequest({ url: `${routes.get}?${params.toString()}`, method: "GET", includeBody: false });
    if(response.ok) {
        const data = await response.json();
        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.results;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while searching");
}