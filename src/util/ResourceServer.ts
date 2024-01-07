import { APIRoutes } from "./AppTypes";

export const getServerBase = () => {
    return "http://localhost:8082";
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