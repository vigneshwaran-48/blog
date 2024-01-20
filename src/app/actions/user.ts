"use server";

import { getUserResourceRoutes } from "@/util/ResourceServer";
import { authOptions } from "@/util/authOptions";
import { getTokenFromSession } from "@/util/getTokenFromSession";
import { isAuthenticated } from "@/util/isAuthenticated";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const getAllUsers = async () => {

    const routes = getUserResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    const response = await fetch(routes.get, {
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`
                                }
                            });

    if(response.ok) {
        const data = await response.json();
                        
        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.users;
    }
    throw new Error("Error while fetching users details");

}

export const getProfile = async () => {

    const routes = getUserResourceRoutes();

    const session = await getServerSession(authOptions);

    if(!isAuthenticated(session as Session, false)) {
        redirect("/api/auth/signin");
    }

    const accessToken = getTokenFromSession(session as Session);

    const response = await fetch(`${routes.get}/profile`, {
                                headers: {
                                    "Authorization": `Bearer ${accessToken}`
                                }
                            });

    console.log(response.status);
    console.log(response.ok);
    if(response.ok) {
        const data = await response.json();
                                                
        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.user;
    }
    throw new Error("Error while fetching users details");
}