import { Dispatch } from "react";

export interface Posts {
    allPosts: PostItem[];
}

export interface Users {
    allUsers: User[];
}

export interface PostItem {
    id: string;
    title: string;
    body: string;
    author: string;
}

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    website?: string;
    address?: string;
    company?: Company;
}

export interface Company {
    name: string;
    bs?: string;
    catchPhrase: string;
}

export interface ContextState {
    state: {
        posts: PostItem[];
        users: User[];
        post: PostItem | null;
        user: User | null;
    };
    dispatch: Dispatch<ContextAction>;
}

export interface ContextAction {
    type: string;
    payload: any;
}
