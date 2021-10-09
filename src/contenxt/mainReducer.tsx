import { ContextAction } from "../entities";
import { GET_POST, GET_USER, STORE_POST, STORE_USER } from "./mainAction";

const mainReducer = (state: any, action: ContextAction) => {
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
