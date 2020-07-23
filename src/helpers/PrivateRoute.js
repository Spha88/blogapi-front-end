import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('myJwt');
    !token && console.log('Not authorized');
    return (
        <Route {...rest} render={props => token ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: "/login" }} />
            )
        } />
    )
}

export default PrivateRoute;