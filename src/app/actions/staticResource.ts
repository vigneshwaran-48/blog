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
        contentType: "application/json"
    });
    if(response.ok) {
        const data = await response.json();
        if(data.status !== 201) {
            throw new Error(data.error);
        }
        return data.id;
    }
    throw new Error("Error while uploading image");
}