import { ContextAction } from "../entities";
import { GET_POST, STORE_POST } from "./mainAction";

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

        default:
            return state;
    }
};

export default mainReducer;
