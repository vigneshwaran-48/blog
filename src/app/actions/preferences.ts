"use server";

import { Theme } from "@/lib/features/settings/preferencesSlice";
import { APIRoutes } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getUserResourceRoutes } from "@/util/ResourceServer";

export const updateTheme = async (theme: Theme) => {
    const routes: APIRoutes = getUserResourceRoutes();

    const preferences = {
        theme: theme
    }

    const response = await sendRequest({
        url: `${routes.get}/preferences`,
        method: "PATCH",
        includeBody: true,
        contentType: "application/json",
        body: JSON.stringify(preferences)
    });

    return await response.json();    
}
