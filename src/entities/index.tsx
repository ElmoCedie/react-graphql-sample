export interface Posts {
    posts: {
        meta: {
            totalCount: number;
        };
        data: PostItem[];
    };
}

export interface Users {
    users: {
        meta: {
            totalCount: number;
        };
        data: User[];
    };
}

export interface PostItem {
    id: string;
    title: string;
    body: string;
    user: User;
}

export interface PostData {
    post: PostItem;
}

export interface User {
    id: string;
    name: string;
    username: string;
    email?: string;
    address?: string;
    phone?: string;
    website?: string;
    company?: string;
}

export interface Company {
    name: string;
    bs?: string;
    catchPhrase: string;
}
