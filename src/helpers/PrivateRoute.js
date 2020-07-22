import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('myJwt');
    console.log('FROM PRIVATE ROUTER', Component)
    return (
        <Route {...rest} render={props => token ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: "/" }} />
            )
        } />
    )
}

export default PrivateRoute;