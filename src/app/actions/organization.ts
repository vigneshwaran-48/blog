"use server";

import { APIRoutes } from "@/util/AppTypes";
import { redirect } from "next/navigation";
import { Organization } from "@/util/AppTypes";
import { revalidatePath } from "next/cache";
import { sendRequest } from "@/util/RequestUtil";
import { getOrganizationResourceRoutes } from "@/util/ResourceServer";

export async function getAllOrganizations() {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const response = await sendRequest({ url: routes.get, method: "GET", includeBody: false });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.organizations;
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    throw new Error("Error while fetching organization details");
}

export async function createOrganization(organization: Organization) {
    const routes: APIRoutes = getOrganizationResourceRoutes();

    const response = await sendRequest({
        url: routes.create,
        method: "POST",
        includeBody: true,
        body: JSON.stringify(organization),
        contentType: "application/json"
    });

    const data = await response.json();
    if (response.status === 200 || response.status === 201) {
        revalidatePath("/organization/list");
        revalidatePath("/organization/edit");
    }
    else if (response.status === 401) {
        redirect("/auth/signin");
    }
    return data;
}

export const addUsersToOrganization = async (id: string, users: string[]) => {
    const routes: APIRoutes = getOrganizationResourceRoutes();

    const params = new URLSearchParams();
    const usersCSV = users.join(",");

    params.set("usersToAdd", usersCSV);

    const response = await sendRequest({
        url: `${routes.getOne(id)}/user?${params.toString()}`,
        method: "POST",
        includeBody: false
    });

    const data = await response.json();
    if (response.ok) {
        revalidatePath(`/organization/edit/${id}/members`, "page");
        revalidatePath(`/organization/edit`);
        revalidatePath(`/organization/list`, "page");
    }
    return data;
}

export const getOrganization = async (id: string) => {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const response = await sendRequest({ url: routes.getOne(id), method: "GET", includeBody: false });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.organization;
    }

    throw new Error("Error while fetching organization details");
}

export const getOrganizationsUserHasEditPermission = async () => {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const searchParams = new URLSearchParams();
    searchParams.set("role", "ADMIN");

    const response = await sendRequest({ url: `${routes.get}?${searchParams.toString()}`, method: "GET", includeBody: false });

    if (response.ok) {
        const data = await response.json();

        if (data.status !== 200) {
            throw new Error(data.error);
        }
        return data.organizations;
    }

    throw new Error("Error while fetching organization details");
}

export const updateOrganization = async (organization: Organization) => {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const response = await sendRequest({
        url: routes.put,
        method: "PUT",
        includeBody: true,
        body: JSON.stringify(organization),
        contentType: "application/json"
    });

    const data = await response.json();

    if (data.status === 200) {
        revalidatePath(`/organization/edit`);
    }
    return data;
}

export const getUsersOfOrganization = async (id: string) => {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const response = await sendRequest({ url: `${routes.getOne(id)}/user`, method: "GET", includeBody: false });

    if (response.ok) {
        const data = await response.json();
        return data.organizationUsers;
    }
    throw new Error(`Error while retrieving users of Organization ${id}`);
}

export const updateUserRole = async (id: string, userId: string, role: string) => {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const response = await sendRequest({
        url: `${routes.getOne(id)}/user/${userId}?role=${role}`,
        method: "PUT",
        includeBody: false
    });

    const data = await response.json();
    if (data.status === 200) {
        revalidatePath(`/organization/edit/${id}/members`);
    }
    return data;
}

export const removeUsersFromOrganization = async (id: string, users: string[]) => {
    const routes: APIRoutes = getOrganizationResourceRoutes();

    const params = new URLSearchParams();
    const usersCSV = users.join(",");

    params.set("usersToRemove", usersCSV);

    const response = await sendRequest({
        url: `${routes.getOne(id)}/user?${params.toString()}`,
        method: "DELETE",
        includeBody: false
    });

    const data = await response.json();
    if (response.ok) {
        revalidatePath(`/organization/edit/${id}/members`, "page");
        revalidatePath(`/organization/edit`);
        revalidatePath(`/organization/list`);
    }
    return data;
}

export const deleteOrganization = async (id: string) => {

    const routes: APIRoutes = getOrganizationResourceRoutes();

    const response = await sendRequest({
        url: `${routes.getOne(id)}`,
        method: "DELETE",
        includeBody: false
    });
    const data = await response.json();
    if (response.status === 401) {
        redirect("/auth/signin");
    }
    revalidatePath(`/organization`);
    return data;
}