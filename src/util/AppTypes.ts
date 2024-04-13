import { Theme } from "@/lib/features/settings/preferencesSlice"

export type Preferences = {
    userId: string,
    id: string,
    theme: Theme
}

export type BlogFeedResponse = {
    message: string,
    status: number,
    time: string,
    blogStatus: PageStatus,
    feed: BlogFeed
}

export type SearchResult = {
    entities: SearchEntity[]
}

export type SearchEntity = {
    type: SearchType,
    id: string,
    profileId: string,
    image: string,
    name: string
}

export type PageStatus = "AVAILABLE" | "NOT_AVAILABLE" | "SIGNUP" | "BUY_PREMIUM";

export type SearchType = "USER" | "ORGANIZATION" | "BLOG" | "ALL";

export type SearchBy = "USER_NAME" | "BLOG_TITLE" | "BLOG_CONTENT" | "ORGANIZATION_NAME" | "PROFILE_ID" | "ALL";

export type Notification = {
    id: string,
    userId: string,
    message: string,
    senderId: string,
    senderName: string,
    senderImage: string,
    time: string,
    seen: boolean,
    senderType: "USER" | "ORGANIZATION",
    organizationId?: string
}

export type Comment = {
    id: string,
    blogId: string,
    commentBy: UserMeta,
    parentComment: Comment,
    threads: Comment[],
    content: string,
    currentUserLikedComment: boolean,
    commentLikesCount: number
}

export type BlogLike = {
    id: string,
    blog: Blog,
    user: UserMeta
}

export type Profile = {
    id: string,
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

export type BlogFeed = {
    blog: Blog,
    comments: Comment[],
    likesOfBlog: BlogLike[]
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
    id?: string,
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
    profileId?: string,
    isLoggedIn?: boolean,
    showLoginPopup?: boolean,
    preferences: Preferences
}

export type BlogCategory = string;

export type Organization = {
    name?: string,
    id?: string,
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