export type BlogMeta = {
    postedUser: UserMeta,
    title: string,
    content: string,
    date: string,
    image: string,
    categories: BlogCategory[]
}

export type UserMeta = {
    name: string,
    image: string,
    description?: string
}

export type BlogCategory = string;

