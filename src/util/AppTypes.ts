
export type BlogLike = {
    id: number,
    blog: Blog,
    user: UserMeta
}

export type Profile = {
    profileId: string,
    name: string,
    description: string,
    type: "USER" | "ORGANIZATION",
    entityId: string,
    bannerImage: string
}

export type ProfileId = {
    id: number,
    profileId: string,
    entityId: string,
    type: "USER" | "ORGANIZATION"
}

export type Blog = {
    owner: UserMeta,
    title: string,
    content: string,
    image: string,
    postedTime?: string,
    categories?: BlogCategory[],
    description?: string,
    displayPostedDate?: string,
    id?: number,
    email?: string,
    publishedAt?: ProfileId,
    publised?: boolean
}

export type UserMeta = {
    id: string,
    name?: string,
    image?: string,
    description?: string
    email?: string,
    profileId?: string
}

export type BlogCategory = string;

export type Organization = {
    name?: string,
    id?: number,
    description?: string,
    owner?: UserMeta,
    createdTime?: number,
    visibility?: "PRIVATE" | "PUBLIC",
    joinType?: "MEMBERS_INVITE" | "INVITE" | "ANYONE",
    image?: string,
    profileId?: string
}

export interface APIRoutes {
    get: string,
    create: string,
    getOne: (id: string | number) => string,
    delete: (id: string | number) => string,
    put: string
}

export enum UserOrganizationRole {
    ADMIN,
    MODERATOR,
    MEMBER
}

export type UserRole = "ADMIN" | "MODERATOR" | "MEMBER";

export interface OrganizationUser {
    details: UserMeta,
    role: UserRole
}

export interface OrganizationUserDTO {
    organization: Organization,
    users: OrganizationUser[]
}