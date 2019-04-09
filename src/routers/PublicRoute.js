import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => (
        localStorage.jwt !== '' ? (
            <Redirect to="/account" />
        ) : (
                <Component {...props} />
            )
    )} />
)

export default PublicRoute