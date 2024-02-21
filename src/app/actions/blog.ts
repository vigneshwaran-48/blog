"use server";

import { APIRoutes, Blog } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getBlogResourceRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addBlog = async (blog: Blog) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({
        url: routes.create,
        method: "POST",
        includeBody: true, 
        body: JSON.stringify(blog),
        contentType: "application/json"
    });

    const data = await response.json();
    if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    revalidatePath("/blog/stories");
    return data;
}

export const getBlogsOfUser = async (userId: string) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}/user/${userId}`, method: "GET", includeBody: false });

    if(response.ok) {
        const data = await response.json();

        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.blogs;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while fetching blog details");
}

export const deleteBlog = async (id: number) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: routes.getOne(id), method: "DELETE", includeBody: false });

    const data = await response.json();
    if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    revalidatePath("/blog/stories");
    return data;
}

export const getBlog = async (id: number) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: routes.getOne(id), method: "GET", includeBody: false });

    if(response.ok) {
        const data = await response.json();

        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.blog;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while fetching blog");
}

export const updateBlog = async (blog: Blog) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({
        url: routes.put,
        method: "PATCH",
        includeBody: true, 
        body: JSON.stringify(blog),
        contentType: "application/json"
    });

    const data = await response.json();
    if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    revalidatePath(`/blog/compose/${blog.id}`);
    revalidatePath("/blog/stories");
    return data;
}

export const getLikesCountOfBlog = async (id: number) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/like/count`, method: "GET", includeBody: false });

    if(response.ok) {
        const data = await response.json();

        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.likesCount;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while fetching blog");
}

export const getLikesOfBlog = async (id: number) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/like`, method: "GET", includeBody: false });

    if(response.ok) {
        const data = await response.json();

        if(data.status !== 200) {
            throw new Error(data.error);
        }
        return data.likes;
    }
    else if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    throw new Error("Error while fetching blog");
}

export const likeBlog = async (id: number) => {
    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/like`, method: "POST", includeBody: false });

    const data = await response.json();
    if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    revalidatePath(`/blog/[profileId]/${id}`);
    return data;
}

export const removeLikeFromBlog = async (id: number) => {
    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/like`, method: "DELETE", includeBody: false });

    const data = await response.json();
    if(response.status === 401) {
        redirect("/api/auth/signin");
    }
    revalidatePath(`/blog/[profileId]/${id}`);
    return data;
}