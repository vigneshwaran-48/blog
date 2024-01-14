"use server";

import { getStaticResourceRoutes } from "@/util/ResourceServer";
import { authOptions } from "@/util/authOptions";
import { getTokenFromSession } from "@/util/getTokenFromSession";
import { isAuthenticated } from "@/util/isAuthenticated";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const uploadImage = async(formData: FormData) => {

    const routes = getStaticResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    const response = await fetch(routes.create, {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`,
                                },
                                body: formData
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