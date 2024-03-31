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
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath("/stories");
    return data;
}

export const getBlogsOfUser = async () => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: `${routes.get}/user`, method: "GET", includeBody: false });

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
    throw new Error("Error while fetching blog details");
}

export const deleteBlog = async (id: string) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: routes.getOne(id), method: "DELETE", includeBody: false });

    const data = await response.json();
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath("/stories");
    return data;
}

export const getBlog = async (id: string) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: routes.getOne(id), method: "GET", includeBody: false });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            console.log(data);
            throw new Error(data.error);
        }
        return data.blog;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
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
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath(`/compose/${blog.id}`);
    revalidatePath("/stories");
    return data;
}

export const getLikesCountOfBlog = async (id: string, profileId: string) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({
        url: `${routes.getOne(id)}/like/count?profileId=${profileId}`,
        method: "GET",
        includeBody: false
    });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.likesCount;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching blog");
}

export const getLikesOfBlog = async (id: string, profileId: string) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({
        url: `${routes.getOne(id)}/like?profileId=${profileId}`,
        method: "GET",
        includeBody: false
    });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.likes;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching likes of blog");
}

export const likeBlog = async (id: string, profileId: string) => {
    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({
        url: `${routes.getOne(id)}/like?profileId=${profileId}`,
        method: "POST",
        includeBody: false
    });

    const data = await response.json();
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath(`/[profileId]/${id}`);
    return data;
}

export const removeLikeFromBlog = async (id: string, profileId: string) => {
    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({
        url: `${routes.getOne(id)}/like?profileId=${profileId}`,
        method: "DELETE",
        includeBody: false
    });

    const data = await response.json();
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath(`/[profileId]/${id}`);
    return data;
}

export const getBlogOfProfile = async (blogId: string, profileId: string) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({
        url: `${routes.getOne(blogId)}/profile/${profileId}`,
        method: "GET",
        includeBody: false
    });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.blog;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching blog of profile");
}

export const getAllBlogsOfProfile = async (profileId: string) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({
        url: `${routes.get}/profile/${profileId}`,
        method: "GET",
        includeBody: false
    });

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
    throw new Error("Error while fetching blogs of profile");
}

export const publishBlog = async (id: string, publishAtProfileId: string) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({
        url: `${routes.getOne(id)}/publish?publishAt=${publishAtProfileId}`,
        method: "POST",
        includeBody: false
    });

    const data = await response.json();
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    return data;
}

export const unPublishBlog = async (id: string) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({
        url: `${routes.getOne(id)}/unpublish`,
        method: "POST",
        includeBody: false
    });

    const data = await response.json();
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    return data;
}

export const getFeeds = async (page: number) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({
        url: `${routes.get}/feeds?page=${page}`,
        method: "GET",
        includeBody: false
    });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.blogs;
    }
    else if (response.status === 401) {
        console.log("Got 401 response from server, So redirecting!");
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching blog feeds of user");

}