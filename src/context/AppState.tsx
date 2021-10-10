import React, { useReducer } from "react";
import AppContext from "./app-context";
import mainReducer from "./mainReducer";

const AppState = (props: { children: React.ReactChild }) => {
    const [state, dispatch] = useReducer(mainReducer, {
        posts: [],
        users: [],
        post: null,
        user: null,
    });

    return <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>;
};

export default AppState;
