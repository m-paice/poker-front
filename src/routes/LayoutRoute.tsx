import React from "react";

import { Route } from "react-router-dom";

import Layout from "../Layout/Layout";

interface PropsLayout {
    exact: boolean;
    path: string;

    component: React.ElementType;
}

const PrivateRoute: React.FC<PropsLayout> = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <Layout>
                    <Component {...matchProps} />
                </Layout>
            )}
        />
    );
};

export default PrivateRoute;
