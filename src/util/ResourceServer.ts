import { APIRoutes } from "./AppTypes";

export const getServerBase = () => {
    return process.env.NEXT_PUBLIC_RESOURCE_SERVER_URL;
}

export const getOrganizationResourceRoutes = () => {
    
    const serverBase = getServerBase();

    const routes : APIRoutes = {
        get: `${serverBase}/api/v1/app/organization`,
        getOne: (id: string|number) => `${serverBase}/api/v1/app/organization/${id}`,
        create: `${serverBase}/api/v1/app/organization`,
        put: `${serverBase}/api/v1/app/organization`,
        delete: (id: string|number) => `${serverBase}/api/v1/app/organization/${id}`
    }
    return routes;
}

export const getUserResourceRoutes = () => {
    const serverBase = getServerBase();

    const routes : APIRoutes = {
        get: `${serverBase}/api/v1/app/user`,
        getOne: (id: string | number) => `${serverBase}/api/v1/app/user/${id}`,
        create: `${serverBase}/api/v1/app/user`,
        put: `${serverBase}/api/v1/app/user`,
        delete: (id: string | number) => `${serverBase}/api/v1/app/user/${id}`
    }
    return routes;
}

export const getStaticResourceRoutes = () => {
    const serverBase = getServerBase();

    const routes : APIRoutes = {
        get: "",
        getOne: (id: string | number) => `${serverBase}/static/${id}`,
        create: `${serverBase}/static`,
        put: "",
        delete: (id: string | number) => `${serverBase}/static/${id}`
    }
    return routes;
}

export const getBlogResourceRoutes = () => {
    const serverBase = getServerBase();

    const routes : APIRoutes = {
        get: `${serverBase}/api/v1/app/blog`,
        getOne: (id: string | number) => `${serverBase}/api/v1/app/blog/${id}`,
        create: `${serverBase}/api/v1/app/blog`,
        put: `${serverBase}/api/v1/app/blog`,
        delete: (id: string | number) => `${serverBase}/api/v1/app/blog/${id}`
    }
    return routes;
}

export const getProfileResourceRoutes = () => {
    const serverBase = getServerBase();

    const routes : APIRoutes = {
        get: `${serverBase}/api/v1/app/profile`,
        getOne: (id: string | number) => `${serverBase}/api/v1/app/profile/${id}`,
        create: ``,
        put: ``,
        delete: (id: string | number) => ``
    }
    return routes;
}

export const getNotificationResourceRoutes = () => {
    const serverBase = getServerBase();

    const routes : APIRoutes = {
        get: `${serverBase}/api/v1/notification`,
        getOne: (id: string | number) => `${serverBase}/api/v1/notification/${id}`,
        create: `${serverBase}/api/v1/notification`,
        put: `${serverBase}/api/v1/notification`,
        delete: (id: string | number) => `${serverBase}/api/v1/notification/${id}`
    }
    return routes;
}

export const getSearchResourceRoutes = () => {
    const serverBase = getServerBase();

    const routes : APIRoutes = {
        get: `${serverBase}/api/v1/app/search`,
        getOne: (id: string | number) => ``,
        create: ``,
        put: ``,
        delete: (id: string | number) => ``
    }
    return routes;
}

export const getTagResourceRoutes = () => {
    const serverBase = getServerBase();

    const routes : APIRoutes = {
        get: `${serverBase}/api/v1/app/tag`,
        getOne: (id: string | number) => `${serverBase}/api/v1/app/tag/${id}`,
        create: ``,
        put: ``,
        delete: (id: string | number) => `${serverBase}/api/v1/app/tag/${id}`
    }
    return routes;
}