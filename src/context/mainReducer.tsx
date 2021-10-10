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
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case UPDATE_USER:
            const updatedUser = action.payload;
            const indexUser = state.users.findIndex((item) => item.id === updatedUser.id);
            const newUsersList = state.users;
            newUsersList[indexUser] = updatedUser;
            return {
                ...state,
                users: newUsersList,
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
