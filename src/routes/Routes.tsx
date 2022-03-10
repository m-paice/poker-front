import React from "react";

import { Router } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";

import history from "../utils/history";

// pages
import Room from "../pages/Room";
import Home from "../pages/Home";
import Form from "../pages/Form";
import Logout from "../pages/Logout";

interface Props {}

const Routes: React.FC<Props> = (props) => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Room} />
                <Route exact path="/create" component={Form} />
                <Route exact path="/room/:id" component={Home} />
                <Route exact path="/logout" component={Logout} />
            </Switch>
        </Router>
    );
};

export default Routes;
