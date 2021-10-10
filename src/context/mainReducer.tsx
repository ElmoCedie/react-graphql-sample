import { ContextAction, PostItem, User } from "../entities";
import {
    ADD_USER,
    DELETE_USER,
    GET_POST,
    GET_USER,
    STORE_POST,
    STORE_USER,
    UPDATE_USER,
} from "./mainAction";

interface Props {
    posts: PostItem[];
    users: User[];
    message: string;
    post: PostItem | null;
    user: User | null;
}
const mainReducer = (state: Props, action: ContextAction) => {
    switch (action.type) {
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
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case UPDATE_USER:
            const updatedItem = action.payload;
            const index = state.users.findIndex((item) => item.id === updatedItem.id);
            const newList = state.users;
            newList[index] = updatedItem;
            return {
                ...state,
                users: newList,
            };
        case DELETE_USER:
            const filtered = state.users.filter((value) => {
                return action.payload != value.id;
            });
            return {
                ...state,
                users: filtered,
            };

        default:
            return state;
    }
};

export default mainReducer;
