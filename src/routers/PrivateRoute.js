import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => (
        localStorage.jwt !== '' ? (
            <div>
                <Component {...props} />
            </div>
        ) : (
                <Redirect to="/" />
            )
    )} />
)

export default PrivateRoute