"use server";

import { APIRoutes } from "@/util/AppTypes";
import { sendRequest } from "@/util/RequestUtil";
import { getBlogResourceRoutes } from "@/util/ResourceServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getCommentsOfBlog = async (id: number) => {

    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/comment`, method: "GET", includeBody: false });
    
    const data = await response.json();

    if(data.status === 401) {
        redirect("/api/auth/signin");
    }
    return data.comments;
}

export const postComment = async (profileId: string, blogId: number, content: string, parentCommentId: number | null) => {
    const routes: APIRoutes = getBlogResourceRoutes();
    const body = { content, parentCommentId };

    const response = await sendRequest({ 
        url: `${routes.getOne(blogId)}/comment`,
        method: "POST", 
        includeBody: true,
        contentType: "application/json",
        body: JSON.stringify(body)
    });
    
    const data = await response.json();

    if(data.status === 401) {
        redirect("/api/auth/signin");
    }
    revalidatePath(`/blog/${profileId}/${blogId}`);
    return data;
}

export const likeComment = async (profileId: string, blogId: number, id: number) => {
    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ 
        url: `${routes.getOne(blogId)}/comment/${id}/like`, 
        method: "POST", 
        includeBody: false 
    });
    
    const data = await response.json();

    if(data.status === 401) {
        redirect("/api/auth/signin");
    }
    revalidatePath(`/blog/${profileId}/${blogId}`);
    return data;
}

export const unLikeComment = async (profileId: string, blogId: number, id: number) => {
    const routes: APIRoutes = getBlogResourceRoutes();

    const response = await sendRequest({ 
        url: `${routes.getOne(blogId)}/comment/${id}/like`, 
        method: "DELETE", 
        includeBody: false 
    });
    
    const data = await response.json();

    if(data.status === 401) {
        redirect("/api/auth/signin");
    }
    revalidatePath(`/blog/${profileId}/${blogId}`);
    return data;
}