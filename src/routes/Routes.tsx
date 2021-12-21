import React from "react";

import { Router } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";

import history from "../utils/history";

// pages
import Home from "../pages/Home";

interface Props {}

const Routes: React.FC<Props> = (props) => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact path="/home" component={Home} />
            </Switch>
        </Router>
    );
};

export default Routes;
