"use server";

import { APIRoutes } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getNotificationResourceRoutes } from "@/util/ResourceServer";
import { redirect } from "next/navigation";

export const getNotificationsOfUser = async () => {

    const routes: APIRoutes = getNotificationResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}`, method: "GET", includeBody: false, checkAuthentication: false });
    const data = await response.json();

    if (data.status === 401) {
        redirect("/auth/signin");
    }
    return data.notifications;
}

export const markNotificationAsSeen = async (id: string) => {

    const routes: APIRoutes = getNotificationResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/seen`, method: "POST", includeBody: false });
    const data = await response.json();

    if (data.status === 401) {
        redirect("/auth/signin");
    }
    return data;
}

export const markAllAsSeen = async () => {
    const routes: APIRoutes = getNotificationResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}/seen`, method: "POST", includeBody: false });
    const data = await response.json();

    if (data.status === 401) {
        redirect("/auth/signin");
    }
    return data;
}