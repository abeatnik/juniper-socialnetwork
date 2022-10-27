export interface User {
    first: string;
    last: string;
    id: string;
    url: string;
    bio: string;
}

export interface NewUser {
    first: string;
    last: string;
    password: string;
    email: string;
}

export interface UserRelation {
    ownerId: string;
    viewerId: string;
}
