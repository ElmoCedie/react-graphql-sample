import { ContextAction, PostItem, User } from "../entities";
import { GET_POST, GET_USER, STORE_POST, STORE_USER } from "./mainAction";

interface Props {
    posts: PostItem[];
    users: User[];
    post: PostItem | null;
    user: User | null;
}
const mainReducer = (state: Props, action: ContextAction) => {
    switch (action.type) {
        // Users
        case STORE_POST:
            return {
                ...state,
                posts: action.payload,
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
            };

        // Users
        case STORE_USER:
            return {
                ...state,
                users: action.payload,
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return state;
    }
};

export default mainReducer;
