import { ContextAction } from "../entities";
import { STORE_POST } from "./mainAction";

const mainReducer = (state: any, action: ContextAction) => {
    switch (action.type) {
        case STORE_POST:
            return {
                ...state,
                posts: action.payload,
            };

        default:
            return state;
    }
};

export default mainReducer;
