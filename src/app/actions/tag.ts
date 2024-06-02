"use server";

import { sendRequest } from "@/util/RequestUtil";
import { getTagResourceRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getFollowingTags = async () => {
    const routes = getTagResourceRoutes();
    
    const response = await sendRequest({ url: `${routes.get}/follow`, method: "GET", includeBody: false });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.tags;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching following tags");
}

export const getAllTags = async () => {
    const routes = getTagResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}`, method: "GET", includeBody: false });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.tags;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching tags");
}

export const getTagById = async (id: string) => {
    const routes = getTagResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}/${id}`, method: "GET", includeBody: false });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.tag;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching tag");
}

export const getAllBlogsOfTag = async (id: string) => {
    const routes = getTagResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}/${id}/blog`, method: "GET", includeBody: false });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.blogs;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching blogs of tag");
}

export const applyTagsToBlog = async (blogId: string, tagIds: string[]) => {
    const routes = getTagResourceRoutes();

    let tagIdsStr = "";
    tagIds.forEach(tagId => {
        tagIdsStr += `${tagId},`;
    })
    tagIdsStr = tagIdsStr.substring(0, tagIdsStr.length -1);
    const response = await sendRequest({ url: `${routes.get}/blog/${blogId}?tagIds=${tagIdsStr}`, method: "POST", includeBody: false });

    const data = await response.json();
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath(`/compose/${blogId}`);
    return data;
}

export const followTag = async (id: string) => {
    const routes = getTagResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}/${id}/follow`, method: "POST", includeBody: false });
    const data = await response.json();
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath(`/tag/${id}`);
    return data;
}

export const unFollowTag = async (id: string) => {
    const routes = getTagResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}/${id}/follow`, method: "DELETE", includeBody: false });
    const data = await response.json();
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath(`/tag/${id}`);
    return data;
}

export const getAllBlogsOfTagForFeeds = async (name: string, page: number) => {
    const routes = getTagResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}/${name}/blog/feeds?page=${page}`, method: "GET", includeBody: false });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.blogs;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching blogs of tag for feeds");
}