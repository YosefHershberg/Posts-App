export type post = {
    id: string,
    image: string,
    likes: number
    tags: [],
    text: string
    publishDate: string
    updatedDate: string
}

export type user = {
    email?: string,
    firstName?: string,
    id?: string,
    lastName?: string,
    registerDate?: string,
    updatedDate?: string,
}

export type localPost = {
    owner: user;
    text: string;
}