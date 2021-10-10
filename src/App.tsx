import React from "react";
import "./App.css";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LayoutHeader from "./components/layout/header";
import LayoutContent from "./components/layout/content";
import ListPost from "./features/posts/components/list-post";
import AppState from "./context/AppState";
import ListUsers from "./features/users/components/list-users";

export const client = new ApolloClient({
    uri: "https://graphqlzero.almansi.me/api",
    cache: new InMemoryCache(),
});

const App: React.FC = () => {
    return (
        <div className="App">
            <ApolloProvider client={client}>
                <Router>
                    <AppState>
                        <Layout>
                            <LayoutHeader />
                            <LayoutContent>
                                <Switch>
                                    <Route exact path="/">
                                        <Redirect to="/post" />
                                    </Route>
                                    <Route exact path={["/user", "/user/:id", "/user/update/:id"]}>
                                        <ListUsers />
                                    </Route>
                                    <Route exact path={["/post", "/post/:id", "/post/update/:id"]}>
                                        <ListPost />
                                    </Route>
                                </Switch>
                            </LayoutContent>
                        </Layout>
                    </AppState>
                </Router>
            </ApolloProvider>
        </div>
    );
};

export default App;
