"use server";

import { sendRequest } from "@/util/RequestUtil";
import { getStaticResourceRoutes } from "@/util/ResourceServer";

export const uploadImage = async(formData: FormData) => {

    const routes = getStaticResourceRoutes();

    const response = await sendRequest({ 
        url: routes.create, 
        method: "POST", 
        includeBody: true, 
        body: formData,
        includeContentType: false
    });

    return await response.json();
}