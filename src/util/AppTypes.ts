export type BlogMeta = {
    postedUser: UserMeta,
    title: string,
    content: string,
    date: string,
    image: string,
    categories: BlogCategory[]
}

export type UserMeta = {
    id: string,
    name?: string,
    image?: string,
    description?: string
}

export type BlogCategory = string;

export type Organization = {
    name: string,
    id?: number,
    description?: string,
    owner?: UserMeta,
    createdTime?: number
}
