import React from "react";
import "./App.css";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LayoutHeader from "./components/layout/header";
import LayoutContent from "./components/layout/content";
import ListPost from "./features/posts/components/list-post";
import ListUsers from "./features/users/components/list-users";

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Layout>
                    <LayoutHeader />
                    <LayoutContent>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/user" />
                            </Route>
                            <Route exact path={["/user"]}>
                                <ListUsers />
                            </Route>
                            <Route exact path={["/post", "/post/:id", "/post/update/:id"]}>
                                <ListPost />
                            </Route>
                        </Switch>
                    </LayoutContent>
                </Layout>
            </Router>
        </div>
    );
};

export default App;
