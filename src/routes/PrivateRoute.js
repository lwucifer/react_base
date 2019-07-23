import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import routes from './routes';
import Login from '../components/Pages/Login'
import NotFound from './../components/Elements/NotFound';
export const Routes = () => (
    
        <Switch>
            {/* Private Router */}
            {PrivateRouter(routes)}
            {/* Public Router */}
            {PublicRouter(Login)}
            <Route exact={true} component={NotFound} />
        </Switch>
 
);

const PublicRouter = (Login) => {
    return (
        <Route path="/login" component={Login} />
    );
}

const PrivateRouter = (routes) => {
    let result = null;
    if(routes.length > 0){
        result = routes.map((route, index) => {
            return (
                <PrivateRoute 
                    key={index} 
                    path={route.path} 
                    exact={route.exact} 
                    component={route.main} 
                />
            );
        })
    }
    return result;
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('access_token') ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    )} />
)
