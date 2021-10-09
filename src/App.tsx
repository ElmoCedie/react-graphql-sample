import React from "react";
import "./App.css";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LayoutHeader from "./components/layout/header";
import LayoutContent from "./components/layout/content";
import ListPost from "./features/posts/components/list-post";
import AppState from "./contenxt/AppState";

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
                                    <Route exact path="/user">
                                        <h1>User</h1>
                                    </Route>
                                    <Route exact path={["/post", "/post/:id"]}>
                                        <ListPost />
                                    </Route>
                                    <Route exact path="/post/create-post">
                                        <h1>create</h1>
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
