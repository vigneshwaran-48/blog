"use server";

import { APIRoutes } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getNotificationResourceRoutes } from "@/util/ResourceServer";
import { redirect } from "next/navigation";

export const getNotificationsOfUser = async () => {

    const routes: APIRoutes = getNotificationResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}`, method: "GET", includeBody: false });
    const data = await response.json();

    if(data.status === 401) {
        redirect("/api/auth/signin");
    }
    return data.notifications;
}

export const markNotificationAsSeen = async (id: number) => {

    const routes: APIRoutes = getNotificationResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/seen`, method: "POST", includeBody: false });
    const data = await response.json();

    if(data.status === 401) {
        redirect("/api/auth/signin");
    }
    return data;
}