import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loader from '@components/Loader'
import { useAppSelector } from '@store/hooks'
import NotFound from '@pages/404/NotFound'

const App = Loadable({
    loader: () => import('./App'),
    loading: Loader
})
const Login = Loadable({
    loader: () => import('@pages/auth/Login'),
    loading: Loader
})

export const initRoute = "/dashboard"

const PrivateRoute = ({ children, ...rest }) => {
    const { user, persisted } = useAppSelector(state => state)
    const isUserAuthenticated = !!user.token || !!persisted?.user?.token

    return (
        <Route {...rest} render={({ location }) =>
            isUserAuthenticated
                ? children
                : <Redirect
                    to={{
                        pathname: '/entrar',
                        state: { from: location }
                    }}
                />
        }
        />
    )
}

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute path={initRoute}><App /></PrivateRoute>
                <Route path='/entrar' component={Login} />
                <Route component={NotFound} />
            </Switch>
            <Redirect to={initRoute} />
        </BrowserRouter>
    )
}

export default Router
